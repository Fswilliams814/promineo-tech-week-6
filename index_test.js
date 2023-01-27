 var expect = chai.expect; //method pulled from chai - so anytime we say expect it will call that method

 describe('MyFunctions', function(){
    describe('#doSomething', function(){
        it('should concatenate the two parameters', function(){
            var x = doSomething('Hello', 5);
            expect(x).to.equal('Hello5');
        });
        it('should throw an error if first parameter is not a string', function(){
            expect(function(){
                doSomething(5,5);
            }).to.throw(Error);
        } );
    });
 });



 //now we will write out our code for the unit testing
 /*describe('MyFunctions', function(){ // this describes the test
    describe('#doSomething', function(){ //this is where you create a function to actually do the test
        it('should concatenate the two parameters', function(){ // this describes what you want to get out of the test
            var x = doSomething('Hello', 5); //this is the actual test
            expect(x).to.equal('Hello5');
        });

        it('should throw an error if first parameter is not a string'), function() {
            expect(function() {
                doSomething(5, 5);
            }).to.throw(Error);
        
        });
    });
 });*/


