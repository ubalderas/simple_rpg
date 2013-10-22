$(document).ready(function() {

    // your code here

var slayer = {
    str:40,
    int:5,
    potions:5,
    maxHP:100,
    HP:0,
    maxMP:30,
    MP:0,
    Gold:0,
	turn:false
};

slayer.Attack = function (){
    var slayerDamage = Math.floor(Math.random()*10 + this.str);
	if (Math.floor(Math.random()*10)>7){
		slayerDamage = slayerDamage*2;
		var critical = true;
	}
	
    $slayerDialog = $('<div></div>');
	if (critical){
	    $slayerDialog.html("Awesome, you got a critical hit! the enemy gets "+slayerDamage+" damage!").addClass('green');
	}
	else{
		$slayerDialog.html("You attack the enemy and make "+slayerDamage+" damage!").addClass('green');
    }
	$(".battleWindow").append($slayerDialog);
    enemy.HP -= slayerDamage;
	this.turn = true;
    
};

slayer.heal = function (){
    if (slayer.MP >= 8){
        var healhp= 80 + Math.floor(80*(this.int)/100);
        slayer.HP = Math.min.apply(Math,[this.maxHP,slayer.HP + healhp]);
        slayer.MP -= 8;
        $healDialog = $('<div></div>');
        $healDialog.html("You recovered 80 HP!").addClass('blue');
        $(".battleWindow").append($healDialog);
		this.turn = true;
        
    }
    else{
        $noMPDialog = $('<div></div>');
        $noMPDialog.html("Not enough MP!");
        $(".battleWindow").append($noMPDialog);    
		this.turn = false;
    }
};

slayer.potion = function (){
    if (slayer.potions>0){
        slayer.HP = Math.min.apply(Math,[this.maxHP,slayer.HP + 50]);
        slayer.potions -= 1;
        $healDialog = $('<div></div>');
        $healDialog.html("You recovered 50 HP!").addClass('blue');
        $(".battleWindow").append($healDialog);
		this.turn = true;
        
    }
    else{
        $alertDialog = $('<div></div>');
        $alertDialog.html("You have no more potions!");
        $(".battleWindow").append($alertDialog);
    	this.turn = false;
    }
};

slayer.battleStart = function(){
    this.HP=this.maxHP;
    this.MP=this.maxMP;
    this.potions = 5;
};

function goblin() {
    this.str=20;
    this.maxHP=100;
    this.HP=0;
	this.expHP=5;
	this.expstr=4;
	this.expgold=20;
    this.expint=2;
    this.expMP=2;
	
	this.Attack = function(){
		var goblinDamage = Math.floor(Math.random()*10 +  this.str);
		$goblinDialog = $('<div></div>');
		$goblinDialog.html("Snap! the goblin hits you with "+goblinDamage+" damage!").addClass('red');
		$(".battleWindow").append($goblinDialog);
		slayer.HP -= goblinDamage;
       
    };
    
	this.Heal = function(){
		var healhp= 30 ;
        this.HP += healhp;
        
        $goblinhealDialog = $('<div></div>');
        $goblinhealDialog.html("Enemy recovered "+healhp+" HP!").addClass('blue');
        $(".battleWindow").append($goblinhealDialog);
	}
	
	this.Turn = function (){
		if (this.HP < this.maxHP/3 && Math.floor(Math.random()*10)>5){
		
			this.Heal();
		}
		else{
			this.Attack();
		}
	}
	
    this.battleStart = function(){
        this.HP = this.maxHP;
    };
}

function dragon () {
    this.str=60;
    this.maxHP=350;
    this.HP=0;
	this.expHP=20;
	this.expstr=10;
	this.expgold=30;
    this.expint=4;
    this.expMP=4;
	
	this.Attack = function (){
		var dragonDamage = Math.floor(Math.random()*10 + this.str);
		$dragonDialog = $('<div></div>');
		$dragonDialog.html("Snap! the dragon hit you with "+dragonDamage+" damage!").addClass('red');
		$(".battleWindow").append($dragonDialog);
		slayer.HP -= dragonDamage;
	};
    
	this.Heal = function(){
		var healhp= 60 ;
        this.HP += healhp;
        
        $dragonhealDialog = $('<div></div>');
        $dragonhealDialog.html("Enemy recovered "+healhp+" HP!").addClass('blue');
        $(".battleWindow").append($dragonhealDialog);
	}
	
	this.Turn = function (){
		if (this.HP < this.maxHP/3 && Math.floor(Math.random()*10)>5){
		
			this.Heal();
		}
		else{
			this.Attack();
		}
	}
	
    this.battleStart = function(){
        this.HP = this.maxHP;
    };
}


//Play button click function
$('#play').click(function(){
    
    $('#titleScreen').html("Choose an enemy!");
    // show goblin and dragon button
    $('button').removeClass('gameover');
    $('#play').addClass('gameover');
    $('#heal').addClass('gameover');
	$('#potion').addClass('gameover');
	$('#attack').addClass('gameover');
   
});

$('#goblin').click(function(){
    enemy = new goblin();
	slayer.battleStart();
    enemy.battleStart();
    $('.battleWindow').empty();
    //remove play button, show attack and heal button
    $('button').removeClass('gameover');
    $('.playerStats div').removeClass('gameover');
    $('.enemyStats div').removeClass('gameover');
    $('#play').addClass('gameover');
	$('#goblin').addClass('gameover');
	$('#dragon').addClass('gameover');
    
    statsPrint();
});
$('#dragon').click(function(){
    enemy = new dragon();
	slayer.battleStart();
    enemy.battleStart();
    $('.battleWindow').empty();
    //remove play button, show attack and heal button
    $('button').removeClass('gameover');
    $('.playerStats div').removeClass('gameover');
    $('.enemyStats div').removeClass('gameover');
    $('#play').addClass('gameover');
    $('#goblin').addClass('gameover');
	$('#dragon').addClass('gameover');
    statsPrint();
});
    
$('#attack').click(function(){
    $('.battleWindow').empty();
    slayer.Attack();
    if(enemy.HP <= 0){
        win();
        defeat();
    }
    else{
        
		enemy.Turn();
		if(slayer.HP <= 0){
				lose();
		}
		
    }
    statsPrint();
});
    
$('#heal').click(function(){
    $('.battleWindow').empty();
    slayer.heal();
	if(slayer.turn){
		enemy.Turn();
			if(slayer.HP <= 0){
				lose();
			}
	}
    statsPrint();
});

$('#potion').click(function(){
    $('.battleWindow').empty();
    slayer.potion();
    if(slayer.turn){
		enemy.Turn();
			if(slayer.HP <= 0){
				lose();
			}
	}
    statsPrint();
});

function win(){
    $winDialog=$('<div></div>');
    $winDialog.html("Boom! Enemy Slayed bitches!");
    $(".battleWindow").append($winDialog);
    gameOver();
}

function lose(){
    $loseDialog=$('<div></div>');
    $loseDialog.html("Lolz! you is dead");
    $(".battleWindow").append($loseDialog);
    gameOver();
}

function gameOver(){
    $('button').addClass('gameover');
    $('#play').removeClass('gameover');
    $('.playerStats div').addClass('gameover');
    $('#enemyhp').addClass('gameover');
    $('#play').html('Play Again?');
}

function statsPrint(){
    $('#playerhp').html('HP: '+slayer.HP);
    $('#playermp').html('MP: '+slayer.MP);
    $('#potions').html('Potions: '+slayer.potions);
    $('#enemyhp').html('enemyHP: '+enemy.HP);
}

function defeat(){
    slayer.maxHP = slayer.maxHP+enemy.expHP;
    slayer.str = slayer.str+enemy.expstr;
    slayer.Gold = slayer.Gold+enemy.expgold;
    slayer.int = slayer.int+enemy.expint;
    slayer.maxMP = slayer.maxMP+enemy.expMP;
}
 
});
