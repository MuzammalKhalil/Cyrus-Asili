import test from 'node:test';
import assert from 'node:assert/strict';
import { filterProperties } from '../src/js/views/marketplace.js';

test('multiple destinations are ORed, with type ANDed', () => {
  assert.deepEqual(filterProperties({country:'uk,uae',type:'Villa'}).map(p=>p.id),['prop-2','prop-4']);
});
test('home search parameters remain compatible', () => {
  assert.deepEqual(filterProperties({location:'UAE',bedrooms:'2 Bedrooms'}).map(p=>p.id),['prop-3']);
  assert.equal(filterProperties({location:'London',type:'Off-plan'}).length,0);
});
test('search, price range and highlights narrow results', () => {
  assert.deepEqual(filterProperties({reference:' PROP-3 ',min:'3000000',max:'3200000',highlight:'offPlan,newBuild'}).map(p=>p.id),['prop-3']);
  assert.equal(filterProperties({reference:'missing'}).length,0);
  assert.equal(filterProperties({postcode:'not-supplied'}).length,0);
});
test('bedroom groups and multiselect types match independently', () => {
  const found=filterProperties({bedrooms:'2,5+',type:'Apartment,Villa'});
  assert.equal(found.length,5);
  assert.ok(found.every(p=>p.bedrooms===2 || p.bedrooms>=5));
});
test('prices sort within currency without mixing exchange rates', () => {
  assert.deepEqual(filterProperties({country:'uk',sort:'desc'}).map(p=>p.id),['prop-2','prop-1']);
  assert.deepEqual(filterProperties({country:'uk',sort:'asc'}).map(p=>p.id),['prop-1','prop-2']);
});
