const fs = require('fs');
const path = require('path');

let passed = 0;
let failed = 0;

function test(name, fn) {
  try { fn(); passed++; } catch (e) { console.error(`FAIL: ${name} - ${e.message}`); failed++; }
}
function assert(condition, msg) { if (!condition) throw new Error(msg || 'Assertion failed'); }

const modelsDir = path.join(__dirname, '..', 'src', 'models');
const models = ['User', 'Product', 'Category', 'Order', 'Review', 'Cart', 'Coupon', 'Wishlist'];

for (const name of models) {
  test(`${name} model file exists`, () => {
    assert(fs.existsSync(path.join(modelsDir, `${name}.js`)), `${name}.js should exist`);
  });

  test(`${name} model uses mongoose`, () => {
    const content = fs.readFileSync(path.join(modelsDir, `${name}.js`), 'utf8');
    assert(content.includes("require('mongoose')"), `${name} should require mongoose`);
    assert(content.includes('mongoose.model'), `${name} should export a model`);
  });
}

test('mongoose is installed as 6.x', () => {
  const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'));
  assert(pkg.dependencies.mongoose.startsWith('6'), 'mongoose should be 6.x');
});

test('User model has toPublic method', () => {
  const content = fs.readFileSync(path.join(modelsDir, 'User.js'), 'utf8');
  assert(content.includes('toPublic'), 'should have toPublic method');
});

test('Product model has text index', () => {
  const content = fs.readFileSync(path.join(modelsDir, 'Product.js'), 'utf8');
  assert(content.includes("'text'"), 'should have text index');
});

test('Order model has status enum', () => {
  const content = fs.readFileSync(path.join(modelsDir, 'Order.js'), 'utf8');
  assert(content.includes('pending'), 'should have pending status');
  assert(content.includes('shipped'), 'should have shipped status');
});

test('Review model has compound index', () => {
  const content = fs.readFileSync(path.join(modelsDir, 'Review.js'), 'utf8');
  assert(content.includes('unique: true'), 'should have unique compound index');
});

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
