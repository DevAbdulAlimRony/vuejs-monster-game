function getRandomAttack(min, max){
    return Math.floor(Math.random() * (max - min) + min);
}

const app = Vue.createApp({
    data(){
        return {
            currentRound: 0,
            monsterHealth: 100,
            playerHealth: 100,
        };
    },

    computed: {
        monsterBarUpdate(){
            return {width: this.monsterHealth + '%'};
        },
        playerBarUpdate(){
            return {width: this.playerHealth + '%'};
        },
        maxSpecialAttack(){
            return this.currentRound % 3 !== 0;
        }
    },

    methods: {
        monsterAttack(){
            this.currentRound++;
            const attackValue = getRandomAttack(5, 10);
            this.monsterHealth -= attackValue;
            this.playerAttack();
        },

        monsterSpecialAttack(){
            this.currentRound++;
            const attackValue = getRandomAttack(8, 25);
            this.monsterHealth -= attackValue;
            this.playerAttack();
        },

        playerAttack(){
            const attackValue = getRandomAttack(6, 10);
            this.playerHealth -= attackValue;
        }
    }
});

app.mount('#game');