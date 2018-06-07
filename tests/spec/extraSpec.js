describe ('reset', function() {
    it('resets the position of the player after a collision or reaching the end of the screen', function() {
        expect(this.x).toBe(this.x); 
        expect(this.y).toBe(this.y);
    });
});