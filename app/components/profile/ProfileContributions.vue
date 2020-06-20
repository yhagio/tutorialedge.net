<template>
    <div>
        <h5>Profile Contributions</h5>
        <div class="graph">
            <ul class="months">
                <li>Jan</li>
                <li>Feb</li>
                <li>Mar</li>
                <li>Apr</li>
                <li>May</li>
                <li>Jun</li>
                <li>Jul</li>
                <li>Aug</li>
                <li>Sep</li>
                <li>Oct</li>
                <li>Nov</li>
                <li>Dec</li>
            </ul>
            <ul class="days">
                <li>Sun</li>
                <li>Mon</li>
                <li>Tue</li>
                <li>Wed</li>
                <li>Thu</li>
                <li>Fri</li>
                <li>Sat</li>
            </ul>
            <ul class="squares">
            <!-- added via javascript -->
            </ul>
        </div>
    </div>
</template>

<script>
import moment from 'moment';

export default {
    name: "ProfileContributions",
    props: ['challenges'],
    data: function() {
        return {
            challenges: []
        }
    },
    mounted: function() {

        let challengeDateMap = new Map();
        this.challenges.forEach(challenge => {
            let challengeDate = moment(challenge.CreatedAt).dayOfYear();
            if(challengeDateMap.has(challengeDate)) {
                challengeDateMap.set(challengeDate, challengeDateMap.get(challengeDate)+1);
            } else {
                challengeDateMap.set(challengeDate, 1);
            }
        }); 

        let squares = document.querySelector('.squares');
        for (var i = 1; i < 365; i++) {
            
            let level = 0;
            let day = moment().dayOfYear(i).dayOfYear();
            if(challengeDateMap.has(day)) {
                let count = challengeDateMap.get(day);
                if(count >= 3) {
                    level = 3;
                } else {
                    level = count
                }
            }
            squares.insertAdjacentHTML('beforeend', `<li data-level="${level}"></li>`);
        }
    }
}
</script>

<style lang="scss">
:root {
  --square-size: 15px;
  --square-gap: 5px;
  --week-width: calc(var(--square-size) + var(--square-gap));
}

.months { grid-area: months; }
.days { grid-area: days; }
.squares { grid-area: squares; }

.graph {
  display: inline-grid;
  grid-template-areas: "empty months"
                       "days squares";
  grid-template-columns: auto 1fr;
  grid-gap: 10px;
  font-size: 0.8rem;
  line-height: 1rem;
}

.months {
  display: grid;
  grid-template-columns: calc(var(--week-width) * 4) /* Jan */
                         calc(var(--week-width) * 4) /* Feb */
                         calc(var(--week-width) * 4) /* Mar */
                         calc(var(--week-width) * 5) /* Apr */
                         calc(var(--week-width) * 4) /* May */
                         calc(var(--week-width) * 4) /* Jun */
                         calc(var(--week-width) * 5) /* Jul */
                         calc(var(--week-width) * 4) /* Aug */
                         calc(var(--week-width) * 4) /* Sep */
                         calc(var(--week-width) * 5) /* Oct */
                         calc(var(--week-width) * 4) /* Nov */
                         calc(var(--week-width) * 5) /* Dec */;
}

.days,
.squares {
  display: grid;
  grid-gap: var(--square-gap);
  grid-template-rows: repeat(7, var(--square-size));
}

.squares {
  grid-auto-flow: column;
  grid-auto-columns: var(--square-size);
}


/* Other styling */
.graph {
  width: 100%;
  margin-bottom: 40px;
}

.graph ul {
    margin: 0 !important;
    padding: 0 !important; 
    list-style-type: none !important;
}

.graph ul li {
    margin: 0 !important;
    padding: 0 !important;
    list-style-type: none !important;
}

.days li:nth-child(odd) {
  visibility: hidden;
}

.squares li {
  background-color: #ebedf0;
}

.squares li[data-level="1"] {
  background-color: #c6e48b;
}

.squares li[data-level="2"] {
  background-color: #7bc96f;
}

.squares li[data-level="3"] {
  background-color: #196127;
}
</style>