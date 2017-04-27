/**
 * Created by wxy on 2017/3/20.
 */
var HOTSPOT = {};
$(function() {
	var musicIndex = 0;
    $("body").on("touchmove", function(e) {
        e.preventDefault();
    });

    //初始化游戏  游戏 宽高
    var gameWidth = 640;
    var gameHeight = 1040;
    var ua = navigator.userAgent, wx = /MicroMessenger/i.test(ua), ios = /ip(?=od|ad|hone)/i.test(ua);

    /**
     * 判断横竖屏
     */
    //全局变量
    var krpano;
    var initFlag = true;
    var portrait = false;
    var _this;
    var timer;
    var game;
    var progressText;// 进度
    var is_shake=true; //陀螺仪开关
    var view=true;//文字是否出现
    var music;
    var page_num;

    function orien() {
        if(window.orientation== 90 || window.orientation == -90) {
            if(initFlag) {
                initFlag = false;
                portrait = true;
            }
            $("#landscape").show();
        } else {
            $("#landscape").hide();
            if(portrait) {
                location.reload();
            } else {
                if(initFlag) {
                    initFlag = false;
                    //开始执行游戏
                    game = new Phaser.Game(gameWidth,gameHeight,Phaser.CANVAS,'main',bootScene,true);
                }
            }
        }
    }
    orien();
    $(window).on("orientationchange", orien);

    var bootScene= function (game) {

    };
    bootScene.prototype={
        preload: function () {
            this.load.image('loading_circle',prefix+'img/loading/loading_circle.png'+version);
            this.load.image('loading_bor',prefix+'img/loading/loading_bor.png'+version);
            this.load.image('start_0',prefix+'img/start/start_/start_0.jpg'+version);
            this.load.image('loading_word1',prefix+'img/loading/loading_word1.png'+version);
            this.load.image('loading_word2',prefix+'img/loading/loading_word2.png'+version);
            this.load.image('loading_mask1',prefix+'img/loading/loading_mask1.png'+version);
            this.load.image('loading_mask2',prefix+'img/loading/loading_mask2.png'+version);
        },
        create: function () {
            //场景的背景
            this.stage.backgroundColor = '#e7e7e7';
            //
            this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
            this.state.start('loader');
        }
    };

    var loaderScene= function (game) {

    };
    loaderScene.prototype={
        init: function () {

            this.bg = this.add.image(0,0, 'start_0');
            this.bg.scale.x=this.bg.scale.y=1.63;
            this.bg.alpha=0;

            this.loading_mask1=this.add.image(gameWidth/2-45.5,218,'loading_mask1');
            this.loading_mask1.anchor.set(0.5,0);

            this.loading_mask2=this.add.image(gameWidth/2+45.5,130,'loading_mask2');
            this.loading_mask2.anchor.set(0.5,0);

            this.loading_word1=this.add.image(gameWidth/2-45.5,218,'loading_word1');
            this.loading_word1.anchor.set(0.5,0);

            this.loading_word2=this.add.image(gameWidth/2+45.5,130,'loading_word2');
            this.loading_word2.anchor.set(0.5,0);

            this.loading_word1_mask=game.add.graphics();
            this.loading_word1_mask.beginFill(0xff0000,1);
            this.loading_word1_mask.drawRect(220,218-this.loading_word1.height*2,this.loading_word1.width+10,this.loading_word1.height);
            this.loading_word1_mask.endFill();
            this.loading_word1.mask=this.loading_word1_mask;

            this.loading_word2_mask=game.add.graphics();
            this.loading_word2_mask.beginFill(0xff0000,1);
            this.loading_word2_mask.drawRect(320,130-this.loading_word2.height*2,this.loading_word2.width+10,this.loading_word2.height*2);
            this.loading_word2_mask.endFill();
            this.loading_word2.mask=this.loading_word2_mask;

            this.loading_circle=this.add.sprite(gameWidth/2,729, 'loading_circle');
            this.loading_circle.anchor.set(0.5,0);

            this.loading_bor=this.add.sprite(gameWidth/2,754, 'loading_bor');
            this.loading_bor.anchor.set(0.5,0.5);
            game.add.tween(this.loading_bor).to({angle:360},1500,Phaser.Easing.Linear.Out,true,0,-1,false);

            progressText = this.add.text(gameWidth/2, 740, '0', { font: "24px",fill: '#009ea1' });
            progressText.anchor.set(0.5,0);

        },
        preload: function () {

            //public
            this.load.image('page1',prefix+'img/public/1_.png'+version);
            this.load.image('page2',prefix+'img/public/2.png'+version);
            this.load.image('page3',prefix+'img/public/3.png'+version);
            this.load.image('page4',prefix+'img/public/4.png'+version);
            //start
            this.load.image('start_word1',prefix+'img/start/start_word1.png'+version);
            this.load.image('start_word2',prefix+'img/start/start_word2.png'+version);
            //start_
            for(var i=1;i<32;i++){
                this.load.image('start_'+i,prefix+'img/start/start_/start_'+i+'.jpg'+version);
            }
            //bird
            for(var i=0;i<128;i++){
                this.load.image('bird'+i,prefix+'img/start/bird/bird'+i+'.png'+version);
            }
            //end
            for(var i=0;i<31;i++){
                this.load.image('end_'+i,prefix+'img/end/end_/end_'+i+'.jpg'+version);
            }
            //page1
            this.load.image('page1_bg_top',prefix+'img/page1/bg_top.jpg'+version);
            this.load.image('page1_bg_down',prefix+'img/page1/bg_down.png'+version);
            this.load.image('page1_down_word',prefix+'img/page1/down_word.png'+version);
            this.load.image('page1_title',prefix+'img/page1/page1_title.png'+version);

            //page2
            this.load.image('page2_bg_top',prefix+'img/page2/page2_bg_top.jpg'+version);
            this.load.image('page2_bg_down',prefix+'img/page2/page2_bg_down.png'+version);
            this.load.image('page2_title',prefix+'img/page2/page2_title.png'+version);
            this.load.image('page2_word',prefix+'img/page2/page2_word.png'+version);

            //page3
            this.load.image('page3_bg',prefix+'img/page3/page3_bg1.jpg'+version);
            this.load.image('page3_title',prefix+'img/page3/page3_title.png'+version);
            this.load.image('page3_word',prefix+'img/page3/page3_word.png'+version);

            //page4
            this.load.image('page4_bg_top',prefix+'img/page4/page4_bg_top.jpg'+version);
            this.load.image('page4_bg_down',prefix+'img/page4/page4_bg_down.png'+version);
            this.load.image('page4_title',prefix+'img/page4/page4_title.png'+version);
            this.load.image('page4_word',prefix+'img/page4/page4_word.png'+version);

            //endScene
            this.load.image('end_word',prefix+'img/end/end_word.png'+version);
            this.load.image('again',prefix+'img/end/again.png'+version);
            this.load.image('taste',prefix+'img/end/taste.png'+version);
            this.load.image('end_title_1',prefix+'img/end/end_title_1.png'+version);
            this.load.image('end_title_2',prefix+'img/end/end_title_2.png'+version);
            this.load.image('end_title_3',prefix+'img/end/end_title_3.png'+version);
            this.load.image('end_title_4',prefix+'img/end/end_title_4.png'+version);
            this.load.image('end_title_5',prefix+'img/end/end_title_5.png'+version);

            _this=this;
            //加载进度
            game.load.onFileComplete.add(function(progress) {
                progressText.text=Math.floor(progress);
                _this.loading_word2_mask.y=Math.floor(progress)*_this.loading_word2.height/50;
                _this.loading_word1_mask.y=Math.floor(progress)*_this.loading_word1.height/50;
                _this.bg.alpha=Math.floor(progress)/100;

            });
            //加载完成
            game.load.onLoadComplete.add(function () {
                _this.state.start('start');
            })
        },
        create: function () {
            //初始化
            embedpano({swf:"vtour/tour.swf", xml:"vtour/tour.xml", target:"pano", html5:"auto", mobilescale:1.0, passQueryParameters:true});
            krpano = document.getElementById('krpanoSWFObject');
        }
    };


    var startScene= function () {

    };
    startScene.prototype = {
        create: function () {

            $("#logo").show();
            $("#music").show();
            $("#music_border").css('display','block');
            //if(music_flag)$('#bgm')[0].play(); //背景音乐

            $('#start_m')[0].play();// 开始页音乐
            _this=this;

            this.world.setBounds(0, 0, 2000, 1040);  // 设置游戏世界大小

            this.bg = this.add.image(0,0, 'start_0');
            this.bg.scale.x=this.bg.scale.y=1.63;

            this.loading_word1=this.add.image(gameWidth/2-45.5,218,'loading_word1');
            this.loading_word1.anchor.set(0.5,0);

            this.loading_word2=this.add.image(gameWidth/2+45.5,130,'loading_word2');
            this.loading_word2.anchor.set(0.5,0);

            var index=0;
            var timer_start;

            //播放开始场景的序列帧
            timer_start=game.time.create(false);
            timer_start.loop(40,function(){
                index++;
                if(index>=32){
                    index=0;
                }else{
                    _this.bg .loadTexture('start_'+index,true);
                }
            });
            timer_start.start();


            var index_bird=0;
            var timer_bird;
            this.bird=game.add.image(0,100,'bird0');
            timer_bird=game.time.create(false);
            timer_bird.loop(60,function(){
                index_bird++;
                if(index_bird>=128){
                    index_bird=0;
                }else{
                    _this.bird .loadTexture('bird'+index_bird,true);
                }
            });
            timer_bird.start();
            this.bird.scale.x=this.bird.scale.y=1.4;

            _this.word1 = game.add.image(345,488, 'start_word1');
            _this.word2 = game.add.image(369,488, 'start_word2');

            var word_mask=game.add.graphics();
            word_mask.beginFill(0xff0000,1);
            word_mask.drawRect(369,488-_this.word2.height,_this.word2.width,_this.word2.height);
            word_mask.endFill();
            _this.word2.mask=word_mask;

            var word_mask_1=game.add.graphics();
            word_mask_1.beginFill(0xff0000,1);
            word_mask_1.drawRect(345,488-_this.word1.height,_this.word1.width,_this.word1.height);
            word_mask_1.endFill();
            _this.word1.mask=word_mask_1;

            game.add.tween(word_mask).to({y:_this.word2.height},1500,Phaser.Easing.Linear.Out,true,600).onComplete.add(function () {
                game.add.tween(word_mask_1).to({y:_this.word1.height},1500,Phaser.Easing.Linear.Out,true).onComplete.add(function () {

                        $('#start_m')[0].pause();

                        game.add.tween(_this.loading_word1).to({alpha:0},300,Phaser.Easing.Linear.Out,true);
                        game.add.tween(_this.loading_word2).to({alpha:0},300,Phaser.Easing.Linear.Out,true);
                        game.add.tween(_this.word1).to({alpha:0},300,Phaser.Easing.Linear.Out,true);
                        game.add.tween(_this.word2).to({alpha:0},300,Phaser.Easing.Linear.Out,true);

                        game.add.tween(game.camera).to({x:1700},2500,Phaser.Easing.Linear.Out,true);
                        game.add.tween(_this.bg).to({alpha:0},800,Phaser.Easing.Linear.Out,true,1000).onComplete.add(function () {
                            _this.state.start('page1');
                            timer_start.stop();
                            timer_bird.stop();
                            timer_start=null;
                            timer_bird=null;

                        });
                })
            });
        }
    };

    var page1Scene = function () {

    };
    page1Scene.prototype = {
        create : function(){
            $('#page1_m')[0].play();
            if (music_flag) {
                $('#bgm')[0].pause();
                $('#scene2')[0].pause();
                $('#scene3')[0].pause();
                $('#scene4')[0].pause();
                $('#scene1')[0].play();
            }
            game.time.events.add(Phaser.Timer.SECOND * 1.5, function () {
                is_shake = true;
                if(ios){
                    initTLY(1);//打开陀螺仪
                }
            });
            _this=this;
            //切换的场景；

            this.page1=game.add.image(gameWidth/2,gameHeight/2, 'page1');
            this.page1.anchor.set(0.5);
            this.page1.alpha=0;

            game.time.events.add(Phaser.Timer.SECOND * 2.5, function () {
                _this.page1.alpha=1;
                $("#pano").fadeIn(800);
                HOTSPOT.changeScene(0);
            });

            this.bg=this.add.image(0,0,'page1_bg_top');

            game.add.tween(this.bg).from({alpha:0},600,Phaser.Easing.Linear.In,true);

            this.page1_title = this.add.image(gameWidth/2+1,178, 'page1_title');
            this.page1_title.anchor.set(0.5,0);

            game.add.tween(this.page1_title).from({alpha:0,y:145},1200,Phaser.Easing.Sinusoidal.Out,true,600);

            this.down_bg=this.add.image(-15,0,'page1_bg_down');
            this.down_bg.y=gameHeight-this.down_bg.height+30;

            game.add.tween(this.down_bg).from({y:gameHeight-this.down_bg.height+200},1200,Phaser.Easing.Sinusoidal.Out,true);

            this.page1_down_word=this.add.image(272,776,'page1_down_word');
            game.add.tween(this.page1_down_word).from({alpha:0,y:730},1500,Phaser.Easing.Cubic.Out,true,1800).onComplete.add(function () {

                game.time.events.add(Phaser.Timer.SECOND * 0.6, function () {

                    $('#page1_m')[0].pause();
                    $('#logo').fadeOut(300);

                    is_shake = false;  //关闭陀螺仪
                    game.add.tween(_this.bg).to({alpha: 0}, 300, Phaser.Easing.Linear.Out, true);
                    game.add.tween(_this.page1_title).to({x: gameWidth / 2 + 1}, 300, Phaser.Easing.Linear.Out, true);
                    game.add.tween(_this.down_bg).to({x: -15}, 300, Phaser.Easing.Linear.Out, true);

                    game.add.tween(_this.page1_down_word).to({alpha: 0}, 600, Phaser.Easing.Sinusoidal.Out, true).onComplete.add(function () {

                        game.add.tween(_this.page1_title).to({alpha: 0}, 800, Phaser.Easing.Linear.Out, true);

                        game.add.tween(_this.down_bg).to({y: 3000}, 2000, Phaser.Easing.Exponential.In, true, 1000);

                        game.add.tween(_this.page1).to({
                            x: gameWidth,
                            y: gameHeight / 2 + 6000
                        }, 2000, Phaser.Easing.Exponential.In, true, 1000);

                        game.add.tween(_this.page1.scale).to({
                            x: 30,
                            y: 30
                        }, 2000, Phaser.Easing.Exponential.In, true, 1000).onComplete.add(function () {

                            game.add.tween(_this.page1).to({alpha: 0}, 100, Phaser.Easing.Exponential.Out, true);

                            $('.page1_1_title').fadeIn();

                            $('#logo_chang ul li').eq(0).addClass('gray');
                            $('#main').addClass('hide');
                            musicIndex = 1;
                        });
                    })
                });
            });
        }
    };
    var page2Scene= function (game) {

    };
    page2Scene.prototype= {
        create : function () {
            $('#page2_m')[0].play();
            if (music_flag) {
                $('#bgm')[0].pause();
                $('#scene1')[0].pause();
                $('#scene3')[0].pause();
                $('#scene4')[0].pause();
                $('#scene2')[0].play();
            }
            game.time.events.add(Phaser.Timer.SECOND * 1.5, function () {
                is_shake = true;
                if(ios){
                    initTLY(2);//打开陀螺仪
                }
            });
            _this=this;
            //切换的场景；
            this.page2=game.add.image(gameWidth/2,gameHeight/2, 'page2');
            this.page2.anchor.set(0.5);
            //this.page2_2_bg.alpha=0;
            this.page2.alpha=0;
            game.time.events.add(Phaser.Timer.SECOND * 2, function () {
                _this.page2.alpha=1;
                HOTSPOT.changeScene(2);
            });

            this.page2_bg_top=game.add.image(0,0,'page2_bg_top');
            game.add.tween(this.page2_bg_top).from({alpha:0},1000,Phaser.Easing.Sinusoidal.Out,true);

            this.page2_title =game.add.image(gameWidth/2+1,166,'page2_title');
            this.page2_title.anchor.set(0.5,0);
            game.add.tween(this.page2_title).from({alpha:0,y:130},1500,Phaser.Easing.Sinusoidal.Out,true);

            this.page2_bg_down=game.add.image(-15,0,'page2_bg_down');
            this.page2_bg_down.y=gameHeight-this.page2_bg_down.height;
            game.add.tween(this.page2_bg_down).from({y:gameHeight-this.page2_bg_down.height+150},1500,Phaser.Easing.Sinusoidal.Out,true);

            this.page2_word=game.add.image(gameWidth/2,770,'page2_word');
            this.page2_word.anchor.set(0.5,0);
            game.add.tween(this.page2_word).from({alpha:0,y:720},1500,Phaser.Easing.Sinusoidal.Out,true,2000).onComplete.add(function () {

                game.time.events.add(Phaser.Timer.SECOND * 0.6, function () {

                    $('#page2_m')[0].pause();
                    $('#logo').fadeOut(300);

                    is_shake=false; //陀螺仪停止   回归原位
                    game.add.tween(_this.page2_title).to({x:gameWidth/2+1},300,Phaser.Easing.Linear.Out,true);
                    game.add.tween(_this.page2_bg_top).to({alpha:0},300,Phaser.Easing.Linear.Out,true);
                    game.add.tween(_this.page2_bg_down).to({x:-15},300,Phaser.Easing.Linear.Out,true);

                    game.add.tween(_this.page2_word).to({alpha:0},600,Phaser.Easing.Sinusoidal.Out,true).onComplete.add(function () {

                        game.add.tween(_this.page2_title).to({alpha:0},800,Phaser.Easing.Linear.Out,true);

                        game.add.tween(_this.page2_bg_down).to({y:3000},2000,Phaser.Easing.Exponential.In,true,1000);

                        game.add.tween(_this.page2.scale).to({x:30,y:30},2000,Phaser.Easing.Exponential.In,true,1000);
                        game.add.tween(_this.page2).to({x:gameWidth/2+1600,y:gameHeight/2+7000},2000,Phaser.Easing.Exponential.In,true,1000).onComplete.add(function () {

                            game.add.tween(_this.page2).to({alpha:0},100,Phaser.Easing.Exponential.Out,true);

                            $('.page2_2_logo').fadeIn(600);
                            $('.page2_1_title').fadeIn();

                            $('#main').addClass('hide');

                            musicIndex = 2;

                        });
                    });
                });
            });
        }
    };

    var page3Scene= function (game) {

    };
    page3Scene.prototype={
        create: function () {
            $('#page3_m')[0].play();
            if(music_flag){
                $('#bgm')[0].pause();
                $('#scene2')[0].pause();
                $('#scene1')[0].pause();
                $('#scene4')[0].pause();
                $('#scene3')[0].play();
            }
            game.time.events.add(Phaser.Timer.SECOND * 1.5, function () {
                is_shake = true;
                if(ios){
                    initTLY(3);//打开陀螺仪
                }
            });
            _this=this;
            //切换的场景；
            this.page3=game.add.image(gameWidth/2,gameHeight/2, 'page3');
            this.page3.anchor.set(0.5);
            this.page3.alpha=0;
            game.time.events.add(Phaser.Timer.SECOND * 2.5, function () {
                _this.page3.alpha=1;
                HOTSPOT.changeScene(4);
            });

            this.page3_bg=game.add.image(-15,-159,'page3_bg');
            game.add.tween(this.page3_bg).from({y:0},1000,Phaser.Easing.Sinusoidal.Out,true);

            this.page3_title=game.add.image(gameWidth/2+9,181,'page3_title');
            this.page3_title.anchor.set(0.5,0);
            game.add.tween(this.page3_title).from({alpha:0,y:362},1200,Phaser.Easing.Sinusoidal.Out,true,600);
            game.add.tween(this.page3_title.scale).from({x:0,y:0},1200,Phaser.Easing.Sinusoidal.Out,true,600);

            this.page3_word=game.add.image(gameWidth/2,750,'page3_word');
            this.page3_word.anchor.set(0.5,0);
            game.add.tween(this.page3_word).from({y:700,alpha:0},1200,Phaser.Easing.Cubic.Out,true,2000).onComplete.add(function () {

                game.time.events.add(Phaser.Timer.SECOND * 0.6, function () {

                    $('#page3_m')[0].pause();
                    $('#logo').fadeOut(300);

                    is_shake=false;
                    game.add.tween(_this.page3_bg).to({alpha:0},300,Phaser.Easing.Linear.Out,true);
                    game.add.tween(_this.page3_title).to({x:gameWidth/2+9},300,Phaser.Easing.Linear.Out,true);

                    game.add.tween(_this.page3_word).to({alpha:0},600,Phaser.Easing.Sinusoidal.Out,true).onComplete.add(function () {

                        game.add.tween(_this.page3_title).to({alpha:0},800,Phaser.Easing.Linear.Out,true);

                        game.add.tween(_this.page3.scale).to({x:25,y:25},2000,Phaser.Easing.Exponential.In,true,1000);
                        game.add.tween(_this.page3).to({x:gameWidth/2,y:gameHeight/2+4000},2000,Phaser.Easing.Exponential.In,true,1000).onComplete.add(function () {

                            game.add.tween(_this.page3).to({alpha:0},100,Phaser.Easing.Exponential.Out,true);

                            $('.page3_1_title').fadeIn();

                            $('#main').addClass('hide');

                            musicIndex = 3;

                        })
                    });
                });
            });
        }
    };

    var page4Scene= function (game) {

    };
    page4Scene.prototype={
        create : function(){
            $('#page4_m')[0].play();
            if(music_flag){
                $('#bgm')[0].pause();
                $('#scene2')[0].pause();
                $('#scene3')[0].pause();
                $('#scene1')[0].pause();
                $('#scene4')[0].play();
            }
            game.time.events.add(Phaser.Timer.SECOND * 1.5, function () {
                is_shake = true;
                if(ios){
                    initTLY(4);//打开陀螺仪
                }
            });
            _this=this;
            //切换的场景；
            this.page4=game.add.image(gameWidth/2,gameHeight/2, 'page4');
            this.page4.anchor.set(0.5);
            this.page4.alpha=0;
            game.time.events.add(Phaser.Timer.SECOND * 2.5, function () {
                _this.page4.alpha=1;
                HOTSPOT.changeScene(6);
            });

            this.page4_bg_top=game.add.image(0,0,'page4_bg_top');

            this.page4_title=game.add.image(gameWidth/2+8,192,'page4_title');
            this.page4_title.anchor.set(0.5,0);
            game.add.tween(this.page4_title).from({y:300,alpha:0},1500,Phaser.Easing.Sinusoidal.Out,true);

            this.page4_bg_down=game.add.image(-10,0,'page4_bg_down');
            this.page4_bg_down.y=gameHeight-this.page4_bg_down.height+70;
            game.add.tween(this.page4_bg_down).from({y:gameHeight-this.page4_bg_down.height},1500,Phaser.Easing.Cubic.Out,true);

            this.page4_word=game.add.image(gameWidth/2,700,'page4_word');
            this.page4_word.anchor.set(0.5,0);
            game.add.tween(this.page4_word).from({alpha:0,y:650},1200,Phaser.Easing.Cubic.Out,true,2000).onComplete.add(function () {

                game.time.events.add(Phaser.Timer.SECOND * 0.6, function () {

                    $('#page4_m')[0].pause();
                    $('#logo').fadeOut(300);
                    is_shake=false;
                    game.add.tween(_this.page4_bg_top).to({alpha:0},300,Phaser.Easing.Linear.Out,true);
                    game.add.tween(_this.page4_title).to({x:gameWidth/2+8},300,Phaser.Easing.Linear.Out,true);
                    game.add.tween(_this.page4_bg_down).to({x:-10},300,Phaser.Easing.Linear.Out,true);

                    game.add.tween(_this.page4_word).to({alpha:0},600,Phaser.Easing.Sinusoidal.Out,true).onComplete.add(function () {

                        game.add.tween(_this.page4_title).to({alpha:0},800,Phaser.Easing.Linear.Out,true);

                        game.add.tween(_this.page4_bg_down).to({y:1500},1500,Phaser.Easing.Exponential.In,true,1000);

                        game.add.tween(_this.page4.scale).to({x:35,y:35},2000,Phaser.Easing.Exponential.In,true,1000);

                        game.add.tween(_this.page4).to({x:gameWidth/2+600,y:7000},2000,Phaser.Easing.Exponential.In,true,1000).onComplete.add(function () {

                            game.add.tween(_this.page4).to({alpha:0},100,Phaser.Easing.Exponential.Out,true);

                            $('.page4_1_title').fadeIn();

                            $('#main').addClass('hide');
                            musicIndex = 4;

                        })
                    });
                });
            });
        }
    };

    var endScene= function (game) {
    };
    endScene.prototype={
        create : function(){
            musicIndex = 0;
            $("#pano").fadeOut();
            if(music_flag){
                $('#scene2')[0].pause();
                $('#scene3')[0].pause();
                $('#scene1')[0].pause();
                $('#scene4')[0].pause();
                $('#bgm')[0].play();
            }
            _this=this;

            this.end_bg=game.add.image(0,0,'end_0');
            game.add.tween(this.end_bg).from({alpha:0},800,Phaser.Easing.Linear.In,true);

            var index=0;

            timer=game.time.create(false);
            timer.loop(40,function(){
                index++;
                if(index>=31){
                    index=0;
                }else{
                    _this.end_bg .loadTexture('end_'+index,true);
                }
            });
            timer.start();

            this.end_title_1=game.add.image(gameWidth/2,116,'end_title_1');
            this.end_title_1.anchor.set(0.5,0.5);

            this.end_title_2=game.add.image(gameWidth/2,192.5,'end_title_2');
            this.end_title_2.anchor.set(0.5,0.5);

            this.end_title_3=game.add.image(gameWidth/2,253,'end_title_3');
            this.end_title_3.anchor.set(0.5,0.5);

            this.end_title_4=game.add.image(gameWidth/2,313,'end_title_4');
            this.end_title_4.anchor.set(0.5,0.5);

            this.end_title_5=game.add.image(gameWidth/2,396,'end_title_5');
            this.end_title_5.anchor.set(0.5,0.5);

            game.add.tween(this.end_title_1.scale).from({x:2,y:2},1000,Phaser.Easing.Sinusoidal.Out,true,1000);
            game.add.tween(this.end_title_1).from({alpha:0},1200,Phaser.Easing.Sinusoidal.Out,true,1000);
            game.add.tween(this.end_title_2.scale).from({x:2,y:2},1000,Phaser.Easing.Sinusoidal.Out,true,1600);
            game.add.tween(this.end_title_2).from({alpha:0},1200,Phaser.Easing.Sinusoidal.Out,true,1600);
            game.add.tween(this.end_title_3.scale).from({x:2,y:2},1000,Phaser.Easing.Sinusoidal.Out,true,2000);
            game.add.tween(this.end_title_3).from({alpha:0},1200,Phaser.Easing.Sinusoidal.Out,true,2000);
            game.add.tween(this.end_title_4.scale).from({x:2,y:2},1000,Phaser.Easing.Sinusoidal.Out,true,1300);
            game.add.tween(this.end_title_4).from({alpha:0},1200,Phaser.Easing.Sinusoidal.Out,true,1300);
            game.add.tween(this.end_title_5.scale).from({x:2,y:2},1000,Phaser.Easing.Sinusoidal.Out,true,1900);
            game.add.tween(this.end_title_5).from({alpha:0},1200,Phaser.Easing.Sinusoidal.Out,true,1900);

            this.end_word=game.add.image(380,78,'end_word');
            game.add.tween(this.end_word).from({y:48,alpha:0},1200,Phaser.Easing.Linear.In,true,2000);

            this.taste=game.add.button(0,0,'taste', function () {
                window.location.href="http://hisense2.pflm.cn/hisenseDate/index.html?from=groupmessage";
            });
            this.taste.x=90;
            this.taste.y=gameHeight-this.taste.height-80;
            game.add.tween(this.taste).from({alpha:0,y:gameHeight-this.taste.height-50},1200,Phaser.Easing.Linear.In,true,3000);
            
            this.again=game.add.button(0,0,'again', function () {
                timer.stop();
                timer=null;
                _this.state.start('start');
                $("#logo").fadeIn();
                $("#logo").css({
                    left:'0.3rem',
                    top:'0.3rem'
                });
                is_shake=false;
                $('#logo_chang ul li').removeClass('gray');
            });
            this.again.x=gameWidth-90;
            this.again.y=gameHeight-this.again.height-80;
            this.again.anchor.set(1,0);
            game.add.tween(this.again).from({alpha:0,y:gameHeight-this.taste.height-50},1200,Phaser.Easing.Linear.In,true,3000);

        }
    };
    game.state.add('boot',bootScene);
    game.state.add('loader',loaderScene);
    game.state.add('start',startScene);
    game.state.add('page1',page1Scene);
    game.state.add('page2',page2Scene);
    game.state.add('page3',page3Scene);
    game.state.add('page4',page4Scene);
    game.state.add('end',endScene);
    game.state.start('boot');//启动第一个场景

    //音乐
    var music_flag=true;
    $(".music").on("tap",function (e) {
        if(music_flag){
            $("span").css("animation-play-state","paused");
            music_flag=false;
            $("#waves").css({opacity:0});
            switch(musicIndex){
            	case 0:
            		$('#bgm')[0].pause();
            	break;
            	case 1:
            		$('#scene1')[0].pause();
            	break;
            	case 2:
            		$('#scene2')[0].pause();
            	break;
            	case 3:
            		$('#scene3')[0].pause();
            	break;
            	case 4:
            		$('#scene4')[0].pause();
            	break;
            }
            
        }else{
            $("span").css("animation-play-state","running");
            music_flag=true;
            $("#waves").css({opacity:1});
            switch(musicIndex){
            	case 0:
            		$('#bgm')[0].play();
            	break;
            	case 1:
            		$('#scene1')[0].play();
            	break;
            	case 2:
            		$('#scene2')[0].play();
            	break;
            	case 3:
            		$('#scene3')[0].play();
            	break;
            	case 4:
            		$('#scene4')[0].play();
            	break;
            }
        }
    });


    function initTLY(rotate){

        var rotate=rotate;
        validSample = false;
        firstSample = null;
        friction = 0.0; // 陀螺仪运动的摩擦力/振动阻尼。 可设置的数值: 0.0 ~ 0.99 或 auto; 数值越高，阻尼越明显，但这样运动也会延迟得更多。
        degRad = Math.PI/180;

        gyro = {hlookat:0,vlookat:0,camroll:0,touchfriction:0.87};  //touchfriction 触摸屏操控模式下每次缩放的场景形变程度

        window.addEventListener("deviceorientation", handleDeviceOrientation);

        hOffset = window.orientation;
        vOffset = 0;
        hLookAt = 0;
        vLookAt = 0;
        camRoll = 0;
        vElasticSpeed = 0;

        isCamRoll = false; // isCamRoll 根据设备翻转对全景浏览器的摄影机翻转或调平。

        //  view hlookat=0.0 水平视角 -180 至 180 之间

        //  vlookat=0.0 垂曲视角 -90 至 90 之间

        //  camroll=0.0 镜头扭转视角

        function handleDeviceOrientation(event){
            if(!is_shake){
                window.removeEventListener("deviceorientation", handleDeviceOrientation);
                return false;
            }
            // Process event.alpha, event.beta and event.gamma
            var deviceOrientation =  window.orientation,
                orientation = rotateEuler({
                    yaw: event["alpha"] * degRad,
                    pitch: event["beta"] * degRad,
                    roll: event["gamma"] * degRad
                }),
                yaw = wrapAngle( orientation.yaw / degRad ),
                pitch = orientation.pitch / degRad,
                altYaw = yaw,
                factor,
                hLookAtNow = gyro.hlookat,
                vLookAtNow = gyro.vlookat,
                camRollNow = gyro.camroll,
                hSpeed = hLookAtNow - hLookAt,
                vSpeed = vLookAtNow - vLookAt;

            // Ignore all sample untill we get a sample that is different from the first sample
            if(!validSample)
            {
                if( firstSample == null )
                    firstSample = orientation;
                else
                {
                    if( orientation.yaw!=firstSample.yaw || orientation.pitch!=firstSample.pitch || orientation.roll!=firstSample.roll )
                    {
                        firstSample = null;
                        validSample = true;
                        if( isVRelative )
                            vOffset = -pitch;
                    }
                }

                return;
            }

            // Roll / level the viewer camera according to the device roll.
            if( isCamRoll ) {
                camRoll = wrapAngle( 180 + Number(deviceOrientation) - orientation.roll  / degRad );
            }

            // Fix gimbal lock
            if( Math.abs(pitch) > 70 )
            {
                altYaw = event.alpha;

                switch(deviceOrientation)
                {
                    case 0:
                        if (pitch>0)
                            altYaw += 180;
                        break;
                    case 90:
                        altYaw += 90;
                        break;
                    case -90:
                        altYaw += -90;
                        break;

                    case 180:
                        if (pitch<0)
                            altYaw += 180;
                        break;
                }

                altYaw = wrapAngle(altYaw);
                if( Math.abs( altYaw - yaw ) > 180 )
                    altYaw += ( altYaw < yaw ) ? 360 : -360;

                factor = Math.min( 1, ( Math.abs( pitch ) - 70 ) / 10 );
                yaw = yaw * (1 - factor) + altYaw * factor;

                camRoll *= (1 - factor);
            }



            // Track view change since last orientation event
            // ie: user has manually panned, or krpano has altered lookat
            hOffset += hSpeed;
            vOffset += vSpeed;

            // Clamp vOffset
            if(Math.abs( pitch + vOffset ) > 90)
                vOffset = ( pitch+vOffset > 0 ) ? (90 - pitch) : (-90 - pitch);


            hLookAt = wrapAngle(-yaw -180 + hOffset );
            vLookAt = Math.max(Math.min(( pitch + vOffset ),90),-90);


            // Dampen lookat
            if(Math.abs(hLookAt - hLookAtNow) > 180)
                hLookAtNow += (hLookAt > hLookAtNow)?360:-360;


            hLookAt = (1-friction)*hLookAt + friction*hLookAtNow;
            vLookAt = (1-friction)*vLookAt + friction*vLookAtNow;


            if(Math.abs(camRoll - camRollNow) > 180)
                camRollNow += (camRoll > camRollNow)?360:-360;
            camRoll = (1-friction)*camRoll + friction*camRollNow;


            gyro.hlookat = wrapAngle(hLookAt);
            gyro.vlookat = vLookAt;
            gyro.camroll = wrapAngle(camRoll);

            //场景控制

            var scene1;
            var scene2;
            var scene3;
            var scene4;
            var scene_title;
            var xx = getOffsetValue(Math.round( gyro.hlookat));

            if(xx<-12&&xx>-180){
                scene1 = -30;
                scene2 = -30;
                scene3=-30;
                scene4 = -20;
                scene_title=8;
            }else if(xx>12&&xx<180){
                scene1 = 0;
                scene2=0;
                scene3=0;
                scene4=0;
                scene_title=-8;
            }else{
                scene1 = -15;
                scene2 = -15;
                scene3=-15;
                scene4 = -10;
                scene_title=0;
            }

            switch (rotate)
            {
                case 1:
                    game.add.tween(_this.down_bg).to({x:scene1},100,Phaser.Easing.Linear.Out,true);
                    game.add.tween(_this.page1_title).to({x:gameWidth/2+1+scene_title},100,Phaser.Easing.Linear.Out,true);
                    break;
                case 2:
                    game.add.tween(_this.page2_bg_down).to({x:scene2},100,Phaser.Easing.Linear.Out,true);
                    game.add.tween(_this.page2_title).to({x:gameWidth/2+1+scene_title},100,Phaser.Easing.Linear.Out,true);
                    break;
                case 3:
                    game.add.tween(_this.page3_bg).to({x:scene3},100,Phaser.Easing.Linear.Out,true);
                    game.add.tween(_this.page3_title).to({x:gameWidth/2+9+scene_title},100,Phaser.Easing.Linear.Out,true);
                    break;
                case 4:
                    game.add.tween(_this.page4_bg_down).to({x:scene4},100,Phaser.Easing.Linear.Out,true);
                    game.add.tween(_this.page4_title).to({x:gameWidth/2+8+scene_title},100,Phaser.Easing.Linear.Out,true);
                    break;
            }

            //场景控制

            if( vOffset != 0 && vElasticity > 0 )
            {
                if( vSpeed == 0)
                {
                    if( vElasticity == 1)
                    {
                        vOffset = 0;
                        vElasticSpeed = 0;
                    }
                    else
                    {
                        vElasticSpeed = 1 - ((1 - vElasticSpeed) * gyro.touchfriction);
                        vOffset *= 1 - (Math.pow(vElasticity,2) * vElasticSpeed); // use Math.pow to be able to use saner values

                        if( Math.abs( vOffset ) < 0.1 ) {
                            vOffset = 0;
                            vElasticSpeed = 0;
                        }
                    }
                }
                else
                    vElasticSpeed = 0;
            }
        }

        function rotateEuler( euler )
        {
            // This function is based on http://www.euclideanspace.com/maths/geometry/rotations/conversions/eulerToMatrix/index.htm
            // and http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToEuler/index.htm

            var heading, bank, attitude,
                ch = Math.cos(euler.yaw),
                sh = Math.sin(euler.yaw),
                ca = Math.cos(euler.pitch),
                sa = Math.sin(euler.pitch),
                cb = Math.cos(euler.roll),
                sb = Math.sin(euler.roll),

                matrix = [
                    sh*sb - ch*sa*cb,   -ch*ca,    ch*sa*sb + sh*cb,
                    ca*cb,              -sa,      -ca*sb,
                    sh*sa*cb + ch*sb,    sh*ca,   -sh*sa*sb + ch*cb
                ]; // Note: Includes 90 degree rotation around z axis

            /* [m00 m01 m02] 0 1 2
             * [m10 m11 m12] 3 4 5
             * [m20 m21 m22] 6 7 8 */

            if (matrix[3] > 0.9999)
            {
                // Deal with singularity at north pole
                heading = Math.atan2(matrix[2],matrix[8]);
                attitude = Math.PI/2;
                bank = 0;
            }
            else if (matrix[3] < -0.9999)
            {
                // Deal with singularity at south pole
                heading = Math.atan2(matrix[2],matrix[8]);
                attitude = -Math.PI/2;
                bank = 0;
            }
            else
            {
                heading = Math.atan2(-matrix[6],matrix[0]);
                bank = Math.atan2(-matrix[5],matrix[4]);
                attitude = Math.asin(matrix[3]);
            }

            return { yaw:heading, pitch:attitude, roll:bank };
        }

        // utility functions

        function wrapAngle(value)	{ value = value % 360; return (value<=180)? value : value-360;	} // wrap a value between -180 and 180

        function getOffsetValue(current_val) {
            var offsetVlaue = 0;
            if(current_val>-180) {
                offsetVlaue = -current_val;
            } else {
                offsetVlaue = -360-current_val;
            }
            return offsetVlaue;
        }
    }

    var senceArr = ['scene_scene1','scene_scene2','scene_scene3','scene_scene4','scene_scene5','scene_scene6','scene_scene7','scene_scene8'];
    var scenePos = [[0,0],[0,0],[-90,0],[0,0],[0,0],[0,0],[-190,0],[0,0]];
    HOTSPOT["changeScene"] = function(i){

        krpano.call('change('+senceArr[i]+','+scenePos[i][0]+','+scenePos[i][1]+');');

        $('#TV_size img').css({'left':'1rem'});
        if(i==1){
            $('.page1_1_title').fadeOut(300, function () {
                $('.page1_2_title').animate({left:0,opacity:1},900);
                $('#back img').fadeIn();
            });

            $(".detail").fadeIn();
            $('#know img').fadeIn();
            $('#close1 img').css({
                'display': 'block',
                'marginTop': '2.5rem'
            });
            $('#close1 img').on("tap", function (event) {
                $(".detail").fadeOut();
                $('#know img').fadeOut();
                $('#close1 img').css('display', 'none');
                setTimeout(function () {
                    $('.page1_2_title').animate({left:'-0.8rem',opacity:0},900, function () {
                        $('#TV_size img').css({'left':'0.1rem'});
                    });
                },5000);
            })

            $('#logo_chang').fadeIn();
            $('#change_scene img').fadeIn();
            page_num=1;
            view=true;

        }else if(i==3){
            page_num=3;
            view=true;
            $('.page2_2_logo').fadeOut();
            $('.page2_1_title').fadeOut(300, function () {
                $('.page2_2_title').animate({left:0,opacity:1},900);
                $('#back img').fadeIn();
            });
            setTimeout(function () {
                $('.page2_2_title').animate({left:'-0.8rem',opacity:0},900, function () {
                    $('#TV_size img').css({'left':'0.1rem'});
                });
            },5000);
            $('#logo_chang').fadeIn();
            $('#change_scene img').fadeIn();
        }else if(i==5){
            page_num=5;
            view=true;
            $('.page3_1_title').fadeOut(300, function () {
                $('.page3_2_title').animate({left:0,opacity:1},900);
                $('#back img').fadeIn();
            });
            setTimeout(function () {
                $('.page3_2_title').animate({left:'-0.8rem',opacity:0},900, function () {
                    $('#TV_size img').css({'left':'0.1rem'});
                });
            },5000);
            $('#logo_chang').fadeIn();
            $('#change_scene img').fadeIn();
        }else if(i==7){
            page_num=7;
            view=true;
            console.log(1)
            $('.page4_1_title').fadeOut(300, function () {
                $('.page4_2_title').animate({left:0,opacity:1},900);
                $('#back img').fadeIn();
            });
            setTimeout(function () {
                $('.page4_2_title').animate({left:'-0.8rem',opacity:0},900, function () {
                    $('#TV_size img').css({'left':'0.1rem'})
                });
            },5000);
            $('#logo_chang').fadeIn();
            $('#change_scene img').fadeIn();
        }
    };
    $('#back img').on("tap", function () {
        $('#back img').css('display','none');
        $('#TV_size img').css('display','none');
        $('#logo_chang').fadeOut();
        $('#change_scene img').fadeOut();
        if(page_num==1){
            $('.page1_2_title').animate({left:'-0.8rem',opacity:1},600, function () {
                $('.page1_1_title').fadeIn();
            });
            HOTSPOT.changeScene(0);
        }else if(page_num==3){
            $('.page2_2_title').animate({left:'-0.8rem',opacity:1},600, function () {
                $('.page2_1_title').fadeIn();
            });
            HOTSPOT.changeScene(2);
        }else if(page_num==5){
            $('.page3_2_title').animate({left:'-0.8rem',opacity:1},600, function () {
                $('.page3_1_title').fadeIn();
            });
            HOTSPOT.changeScene(4);
        }else if(page_num==7){
            $('.page4_2_title').animate({left:'-0.8rem',opacity:1},600, function () {
                $('.page4_1_title').fadeIn();
            });
            HOTSPOT.changeScene(6);
        }

    })
    
    //详情页
    detail_show=function(index){

        $(".detail").fadeIn();
        $('.detail img').eq(index).css('display','block');

        $('.detail img').eq(index).animate({
            left:'0.6rem'
        },800,function(){
            $('#close img').css({
                'display':'block',
                'marginTop':'3.54rem'
            });
        });

        $('#close img').on("tap", function (event) {
            $('#close img').css('display','none');
            $('.detail img').eq(index).animate({
                left:'6.4rem'
            },300, function () {
                $('.detail img').eq(index).css({
                    left:'-5.2rem',
                    display:'none'
                });
                $('.detail').fadeOut();
            });
        })
    }

    //判断是否在内景电视内
    view_flag= function (flag) {

        if(flag==1||flag==2){
            $('#TV_size img').css('display','block');
        }
        if(flag==3||flag==4){
            $('#TV_size img').css('display','none');
        }
        if(flag==1){
            $('#TV_size img').css('width','0.22rem');
            $('#TV_size img').attr('src','img/public/88.png');
        }else if(flag==2){
            $('#TV_size img').css('width','0.32rem');
            $('#TV_size img').attr('src','img/public/100.png');
        }
        if(view){
            return false;
        }else{
            $('#TV_size img').css('display','none');
        }
    };

    $('#logo_chang ul li').on('tap', function (event) {
        var num=$(this).index();
        if($(this).hasClass('gray')){
            return false;
        }else{
            $('#logo_chang').fadeOut();
            $('#change_scene img').fadeOut();

            $(this).addClass('gray').siblings().removeClass('gray');

            $('#main').removeClass('hide');
            $('#back img').css('display','none');

            view=false;

            $('.page1_2_title').animate({left:'-0.8rem',opacity:0},900);
            $('.page2_2_title').animate({left:'-0.8rem',opacity:0},900);
            $('.page3_2_title').animate({left:'-0.8rem',opacity:0},900);
            $('.page4_2_title').animate({left:'-0.8rem',opacity:0},900, function () {
            	$('#scene1')[0].pause();
            	$('#scene2')[0].pause();
            	$('#scene3')[0].pause();
            	$('#scene4')[0].pause();

                if(num==0){
                    game.state.start('page1');
                    $('.logo_bg').css({'left':'1.06rem','top':'-0,099rem'})
                }else if(num==1){
                    game.state.start('page2');
                    $('.logo_bg').css({'left':'2.02rem','top':'-0,099rem'})
                } else if(num==2){
                    game.state.start('page3');
                    $('.logo_bg').css({'left':'2.98rem','top':'-0,099rem'})
                }else if(num==3){
                    game.state.start('page4');
                    $('.logo_bg').css({'left':'3.94rem','top':'-0,099rem'})
                }else if(num==4){
                    musicIndex = 0;
                    game.state.start('end');
                    $('.logo_bg').css({'left':'1.06rem','top':'-0,099rem'})
                }
                
            })
        }
    })

});
FastClick.attach(document.body);
