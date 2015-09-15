/*global describe, it, beforeEach, inject, expect, angular*/
(function () {
	'use strict';

	beforeEach(module('todomvc'));

	describe('todoFocus directive', function () {
		var scope, compile, browser;

		beforeEach(inject(function ($rootScope, $compile, $browser) {
			scope = $rootScope.$new();
			compile = $compile;
			browser = $browser;
		}));

		it('should focus on truthy expression', function () {
			var el = angular.element('<input todo-focus="focus">');
			scope.focus = false;

			compile(el)(scope);
			expect(browser.deferredFns.length).toBe(0);

			scope.$apply(function () {
				scope.focus = true;
			});

			expect(browser.deferredFns.length).toBe(1);
		});
	});

  describe('todoEscape directive', function () {
    var ESCAPE_KEY = 27;
    var OTHER_KEY = 32;
    var template = '<input todo-escape="escapePressed=true" />';
		var scope, compile;

		beforeEach(inject(function ($rootScope, $compile) {
			scope = $rootScope.$new();
			compile = $compile;
      scope.escapePressed = false;
		}));

    it('should evaluate the given statement when escape key pressed', function () {
      var el = compile(template)(scope);
      el.triggerHandler({type: 'keydown', keyCode: ESCAPE_KEY});
      expect(scope.escapePressed).toBe(true);
    });

    it('should evaluate the given statement when escape key pressed', function () {
      var el = compile(template)(scope);
      el.triggerHandler({type: 'keydown', keyCode: OTHER_KEY});
      expect(scope.escapePressed).toBe(false);
    });

    it('should unbind the handler when the scope is destroyed', function () {
      var el = compile(template)(scope);
      scope.$destroy();
      el.triggerHandler({type: 'keydown', keyCode: ESCAPE_KEY});
      expect(scope.escapePressed).toBe(false);
    });
  });
}());
