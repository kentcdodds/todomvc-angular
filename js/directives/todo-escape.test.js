describe('todo-escape', function() {
  var ESCAPE_KEY = 27;
  var OTHER_KEY = 32;
  var template = '<input todo-escape="escapePressed=true" />';
  var scope, compile;

  beforeEach(module('todomvc'));

  beforeEach(inject(function($rootScope, $compile) {
    scope = $rootScope.$new();
    compile = $compile;
    scope.escapePressed = false;
  }));

  it('should evaluate the given statement when escape key pressed', function() {
    var el = compile(template)(scope);
    el.triggerHandler({type: 'keydown', keyCode: ESCAPE_KEY});
    expect(scope.escapePressed).toBe(true);
  });

  it('should evaluate the given statement when escape key pressed', function() {
    var el = compile(template)(scope);
    el.triggerHandler({type: 'keydown', keyCode: OTHER_KEY});
    expect(scope.escapePressed).toBe(false);
  });

  it('should unbind the handler when the scope is destroyed', function() {
    var el = compile(template)(scope);
    scope.$destroy();
    el.triggerHandler({type: 'keydown', keyCode: ESCAPE_KEY});
    expect(scope.escapePressed).toBe(false);
  });
});
