import { module, test } from 'qunit';
import { click, visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | super rentals', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /', async function (assert) {
    await visit('/');

    assert.equal(currentURL(), '/');

    assert.dom('nav').exists();
    assert.dom('h1').hasText('SuperRentals');

    assert.dom('h2').hasText('Welcome to Super Rentals!');
    assert.dom('.jumbo a.button').hasText('About Us');

    await click('.jumbo a.button');
    assert.equal(currentURL(), '/about');
  });

  test('visiting /about', async function (assert) {
    await visit('/about');

    assert.equal(currentURL(), '/about');

    assert.dom('nav').exists();
    assert.dom('h1').hasText('SuperRentals');

    assert.dom('h2').hasText('About Super Rentals');

    assert.dom('.jumbo a.button').hasText('Contact Us');
    await click('.jumbo a.button');

    assert.equal(currentURL(), '/getting-in-touch');
  });

  test('visiting /getting-in-touch', async function (assert) {
    await visit('/getting-in-touch');

    assert.equal(currentURL(), '/getting-in-touch');

    assert.dom('nav').exists();
    assert.dom('h1').hasText('SuperRentals');

    assert.dom('h2').hasText('Contact Us');

    assert.dom('a.button').hasText('About');
    await click('.jumbo a.button');

    assert.equal(currentURL(), '/about');
  });

  test('navigating using the nav-bar', async function (assert) {
    await visit('/');

    assert.dom('nav').exists();
    assert.dom('nav a.menu-index').hasText('SuperRentals')
    assert.dom('nav a.menu-about').hasText('About');
    assert.dom('nav a.menu-contact').hasText('Contact');

    await click('nav a.menu-about');
    assert.equal(currentURL(), '/about');

    await click('nav a.menu-contact');
    assert.equal(currentURL(), '/getting-in-touch');

    await click('nav a.menu-index');
    assert.equal(currentURL(), '/');
  });

  /**
   * IMPORTANT !!!
   *
   * Please note that below are somet custom tests which are not available at original tutorial
  */

  test('visiting /contact via index page --> about page path', async assert => {
    //Navigating to index route and verifying URL
    await visit('/');
    assert.equal(currentURL(), '/', 'verifying index route URL');

    //Navigating to about route from index route and verifying URL
    assert.dom('.jumbo a.button').hasText('About Us', 'verifying that About Us link is available');
    await click('.jumbo a.button');
    assert.equal(currentURL(), '/about', 'verifying about route URL');

    assert.dom('div div h2').hasText('About Super Rentals', 'verifying that about route header title is About Super Rentals and in the correct location');
    assert.dom('.jumbo a').hasText('Contact Us', 'verifying that Contact Us link is available');
    await click('.jumbo a.button');
    assert.equal(currentURL(), '/getting-in-touch', 'verifying contact route URL is represented as getting-in-touch');
  });


  test('visiting /contact directly via URL', async (assert) => {
    await visit('/getting-in-touch')
    assert.equal(currentURL(), '/getting-in-touch', 'verifying contact route URL is represented as getting-in-touch');
  })
});
