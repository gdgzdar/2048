describe("game", function () {

    describe("canBeMerged", function () {

        it("should not merge different values", function () {

            var alongsideTile = [2, true];
            var movedTile = [4, true];

            expect(canBeMerged(alongsideTile, movedTile)).toBe(false);
        });

        it("should not merge different states", function () {

            var alongsideTile = [2, false];
            var movedTile = [2, true];

            expect(canBeMerged(alongsideTile, movedTile)).toBe(false);
        });

        it("should not merge different states and values", function () {

            var alongsideTile = [2, false];
            var movedTile = [4, true];

            expect(canBeMerged(alongsideTile, movedTile)).toBe(false);
        });

        it("should merge same states and values", function () {

            var alongsideTile = [2, true];
            var movedTile = [2, true];

            expect(canBeMerged(alongsideTile, movedTile)).toBe(true);

        });

        it("should merge with 0", function () {

            var alongsideTile = [0, true];
            var movedTile = [2, true];

            expect(canBeMerged(alongsideTile, movedTile)).toBe(true);

        });
    });

    describe("moveStep", function () {

        beforeEach(function () {
        });

        afterEach(function () {
        });

        function checkValuesIsZero(movedTile) {
            expect(movedTile[NUMBER]).toBe(0);
        }

        it("should not merge non-mergeble tiles", function () {

            var alongsideTile = [2, true];
            var movedTile = [4, true];

            expect(alongsideTile).toEqual([2, true]);
            expect(movedTile).toEqual([4, true]);
        });

        it("should merge if are mergeble", function () {

            var alongsideTile = [2, true];
            var movedTile = [2, true];

            moveStep(alongsideTile, movedTile);
            expect(alongsideTile).toEqual([4, false]);
            expect(movedTile).toEqual([0, true]);
        });


    });

    describe("isOver", function() {

        it("should return false if there is a zero in the gameField", function() {
            var gameField = [
                [[0, true], [0, true], [0, true], [0, true]],
                [[0, true], [0, true], [0, true], [0, true]],
                [[0, true], [0, true], [0, true], [0, true]],
                [[0, true], [0, true], [0, true], [0, true]]];

            expect(isOver(gameField)).toBe(false);
        });

        it("should return false if there are some mergable cells in the gameField", function() {
            var gameField = [
                [[1, true], [2, true], [30, true], [40, true]],
                [[50, true], [60, true], [70, true], [80, true]],
                [[980, true], [100, true], [110, true], [120, true]],
                [[90, true], [90, true], [170, true], [180, true]]];

            expect(isOver(gameField)).toBe(false);
        });

        /*it("should return true if there is a zero in the gameField", function() {
            var gameField = [
                [[0, true], [0, true], [0, true], [0, true]],
                [[0, true], [0, true], [0, true], [0, true]],
                [[0, true], [0, true], [0, true], [0, true]],
                [[0, true], [0, true], [0, true], [0, true]]];

            expect(isOver(gameField)).toBe(false);
        });
*/
    });



    /*describe("isOver", function() {
        it("should do moveUp move", function() {

        });
    });*/

});