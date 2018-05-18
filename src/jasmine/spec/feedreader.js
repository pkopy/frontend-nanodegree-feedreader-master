/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(() => {

    describe('RSS Feeds', () => {

        it('are defined', () => {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);

        });

        it('are url defined', () => {
            for (let i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).not.toBe(0);
            }

        });
        it('are name defined', () => {
            for (let i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBe(0);
            }
        });

    });

    describe('The menu', () => {
        const menu = document.querySelector('body');


        it('menu is hidden', () => {
            expect(menu.className).toMatch('menu-hidden');
        });
        it('menu is changeable', () => {

            menu.className = '';
            expect(menu.className).toMatch('');
            menu.className = 'menu-hidden';
            expect(menu.className).toMatch('menu-hidden');
        });

    });

    describe('Initial Entries', () => {
        let container = $('.feed')
        beforeEach((done) => {
            loadFeed(0, () => {
                done();
            })
        });

        it('is least a single element', (done) => {

            expect(container[0].childNodes.length).not.toBe(0);
            done();

        })
    });

    describe('New Feed Selection', () => {
        let firstHeader;
        let secondHeader;
        beforeEach((done) => {
            loadFeed(1, () => {
                firstHeader = document.querySelector('.header-title').lastChild.data;
                done();
            })
        });
        beforeEach((done) => {
            loadFeed(0, () => {
                secondHeader = document.querySelector('.header-title').lastChild.data;
                done();
            })
        });

        it('is content changes', (done) => {
            expect(firstHeader).toBeDefined();
            expect(secondHeader).toBeDefined();
            expect(firstHeader).not.toEqual(secondHeader);
            done();
        })
    });

});