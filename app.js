function getRandomAttack(min, max){
    return Math.floor(Math.random() * (max - min) + min);
}

const app = Vue.createApp({
    data(){
        return {
            currentRound: 0,
            monsterHealth: 100,
            playerHealth: 100,
            winner: null,
            logMessages: []
        };
    },

    computed: {
        monsterBarUpdate(){
            if(this.monsterHealth < 0){
                return {width: '0%'};
            }
            return {width: this.monsterHealth + '%'};
        },
        playerBarUpdate(){
            if(this.playerHealth < 0){
                return {width: '0%'};
            }
            return {width: this.playerHealth + '%'};
        },
        maxSpecialAttack(){
            return this.currentRound % 3 !== 0;
        }
    },

    watch: {
        monsterHealth(value){
            if(value <= 0 && this.playerHealth <= 0){
                this.winner = 'draw';
            }
            else if(value <= 0){
                this.winner = 'monster';
            }
        },
        playerHealth(value){
            if(value <= 0 && this.monsterHealth <= 0){
                this.winner = 'draw';
            }
            else if(value <= 0){
                this.winner = 'player';
            }
        },
    },

    methods: {
        startGame(){
            this.currentRound = 0;
            this.monsterHealth = 100;
            this.playerHealth = 100;
            this.winner = null;
            this.logMessages = [];
        },
        monsterAttack(){
            this.currentRound++;
            const attackValue = getRandomAttack(5, 10);
            this.monsterHealth -= attackValue;
            this.playerAttack();
            this.addLogMessage('player', 'attack', attackValue);
        },

        monsterSpecialAttack(){
            this.currentRound++;
            const attackValue = getRandomAttack(8, 25);
            this.monsterHealth -= attackValue;
            this.playerAttack();
            this.addLogMessage('player', 'specially attack', attackValue);
        },

        playerAttack(){
            const attackValue = getRandomAttack(6, 10);
            this.playerHealth -= attackValue;
            this.addLogMessage('monster', 'attack', attackValue);
        },

        healPlayer(){
            this.currentRound++;
            const healValue = getRandomAttack(8, 10);
            if(this.playerHealth + healValue > 100){
                this.player = 100;
            }
            else{
                this.playerHealth += healValue;
            }
            this.playerAttack();
            this.addLogMessage('player', 'heal', healValue);
        },
        surrender(){
            this.winner = 'monster';
        },
        addLogMessage(who, what, value){
            this.logMessages.unshift({
                actionBy: who,
                actionType: what,
                actionValue: value
            });
        }
    }
});

app.mount('#game');