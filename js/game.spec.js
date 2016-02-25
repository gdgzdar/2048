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
        var origCanBeMerged;

        beforeEach(function () {
            origCanBeMerged = canBeMerged;
        });

        afterEach(function () {
            canBeMerged = origCanBeMerged;
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

            canBeMerged = function () {
                return true;
            };

            var alongsideTile = [2, true];
            var movedTile = [2, true];

            expect(alongsideTile).toEqual([4, false]);
            expect(movedTile).toEqual([0, true]);
        });


    });

    /*describe("moveUp", function() {
        it("should move up ")
    });*/

});