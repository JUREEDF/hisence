$(function() {
    $("body").on("touchmove", function (e) {
        e.preventDefault();
    });


    //初始化游戏
    var gameWidth = 640;
    var gameHeight = window.innerHeight * gameWidth / window.innerWidth;
    var loop;
    var game;
    var loadingLayer, startLayer, containerLayer;
    var index = 1;
    var index_container = 81;
    var index_home = 132;
    var page1;
    var tranIndex = 11;
    var countNum = 10;//盒子总数
    var curTrans = 0;//当前用的过场
    var cur_index = 0;//当前的盒子
    var cur_pic = 0;//当前的图片
    var runIndex = 0;
    var page;
    var page1Group;
    var homeLoop;
    var showBox;
    var loadPicIndex=0;
    var mainImgB = false;
    var mainImg;
    var clickDetail = false;
    //-----------------------判断横屏------------------------------------------------
    var initFlag = true;
    var landscape = false;
    var showDetail_flag=true;
    var picArr = [
        [prefix+'img/pic/pic1/pic1.jpg',prefix+'img/pic/pic1/pic2.jpg',prefix+'img/pic/pic1/pic3.jpg'],
        [prefix+'img/pic/pic2/pic1.jpg',prefix+'img/pic/pic2/pic2.jpg',prefix+'img/pic/pic2/pic3.jpg'],
        [prefix+'img/pic/pic3/pic1.jpg',prefix+'img/pic/pic3/pic2.jpg',prefix+'img/pic/pic3/pic3.jpg'],
        [prefix+'img/pic/pic4/pic1.jpg',prefix+'img/pic/pic4/pic2.jpg',prefix+'img/pic/pic4/pic3.jpg'],
        [prefix+'img/pic/pic5/pic1.jpg',prefix+'img/pic/pic5/pic2.jpg',prefix+'img/pic/pic5/pic3.jpg'],
        [prefix+'img/pic/pic6/pic1.jpg',prefix+'img/pic/pic6/pic2.jpg',prefix+'img/pic/pic6/pic3.jpg'],
        [prefix+'img/pic/pic7/pic1.jpg',prefix+'img/pic/pic7/pic2.jpg',prefix+'img/pic/pic7/pic3.jpg'],
        [prefix+'img/pic/pic8/pic1.jpg',prefix+'img/pic/pic8/pic2.jpg'],
        [prefix+'img/pic/pic9/pic1.jpg',prefix+'img/pic/pic9/pic2.jpg',prefix+'img/pic/pic9/pic3.jpg'],
        [prefix+'img/pic/pic10/pic1.jpg',prefix+'img/pic/pic10/pic2.jpg']
    ];
    var introArr = [
        '两个设计师都研究了一系列小元素，并将其拼接成 为更大的物体和灵活的组合。陈旻先生选择将元素 展现出来，并尝试了多种表面处理.Morganti先生 选择保持元素的隐蔽性。两位都以简洁和灵活为主 要目标,各用了两种材料去表达共同的强烈关注点： 木/竹+黄铜，混凝土+钢。',
        '人、建筑、环境三者之间存在着密切的关系。但是 冰冷的建筑却隔断了人与自然之间的感知关系。设 计师希望能够让植物成为建筑的材质，让人能够发 现植物表皮的生命存在。同时通过植物的气味和行 为互动刺激人的感知，不仅感知到自然的神奇魅力 ，同时感知到自己的存在。',
        '设计概念源于“自我思考与重新审视”。它是一个与 人互动的立体装置，远远看去极具建筑韵律感。在 它的内部，一条狭窄的折线通道贯穿于空间对角线 ，当人们步入其中，即会被光线和陈设所吸引。你 可以选择伫立或落座，凝望灯晕光环的同时，展开 一场与自我内心的对话。',
        '我们就在这里。/n静默。等风来。/n叶片，/n穿透，摄人心魄。/n光，折射。 /n罅隙中空气的舞动，变幻莫测，虚实莫辨。 /n真实，抑或幻想，已然成谜。',
        '时间分为两种，过去和未来，当下的我是时间轴上 的行者。空间分为两种，熟悉和陌生，此地的你是 空间轴上的旅者。时间与空间的特定组合，加上身 处此时此地的人，便形成了无数个不同的视角，对 景色而言，便有了已看过和要去看之分。',
        '现代人应慢下脚步，安静地聆听自己的内心，获得 精神的全新解放。想要体验古人促膝长谈的心境吗 ？冥想的形式，留住能量，改变心境与交谈方式。 您需要一种这样的情怀，开创全新的艺术生活，作 生活的旅行者。',
        '事件的发生永远也离不开“时间”和“空间”两支坐标。 此时此刻在米兰的聚会，势必勾连起过去的设计行 为和未来的生活方式的连结。建筑和产品，与人类 一起穿行在时光之中，彼此相照，互显价值。',
        '动物和人类都在不断的旅行。在空间中穿行，是旅 行的本质。在中国传统文化中具有重要象征意义的 锦鲤，代表了在空间中不断穿梭的生物。这便是我 们所有人的映像，每个人都在向着自己的龙门奋力 一游，这便是我们的旅行，也给我们所处的空间和 我们自己的生命赋予了全新的意义。',
        '旅行归根结底是在寻找自己内心的回声。设计就是 找到存在于每个人所共同拥有的使用经验，将那份 大家曾经一瞬间想过的想法（共感）化成产品而实 现。设计的终极目的在于抚慰和唤醒人们的感受， 我们称它为回声，这是“回声”的展览的目的。',
        '可持续建筑是设计和建造能够减少和限制对环境影 响的建筑物。在可持续建筑发展的初期，美学被完 全的忽视了，当今的建筑设计师需要做出的努力是 ，在坚持建筑之美的基础上，从有利于身心健康、 有利于环境发展的新角度来重新审视建筑设计。',

    ];

    //判断横屏
    orien();
    $(window).on("orientationchange", orien);

    function orien() {
        if (window.orientation == 90 || window.orientation == -90) {
            //log("这是横屏");
            if (initFlag) {
                initFlag = false;
                landscape = true;
            }
            $("#landscape").show();

        } else {
            $("#landscape").hide();
            if (landscape) {
                // 刷新界面
                location.reload();
            } else {
                if (initFlag) {
                    initFlag = false;
                    //开始执行游戏
                    game = new Phaser.Game(gameWidth, gameHeight, Phaser.AUTO, 'main');
                }
            }
        }
    };


    // 预加载图片
    var bootScene = function (game) {
        this.init = function () {
            game.scale.pageAlignHorizontally = true;
            game.scale.pageAlignVertically = true;
            game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        }
        this.preload = function () {
            //加载背景图片   prefix:cdn地址    version:版本号
            game.load.image('bgImg', prefix + 'img/bg.jpg' + version);
            //加载的loading图片   prefix cdn地址    version 版本号
            for (var i = 1; i < 81; i++) {
                game.load.image('loop' + i, prefix + 'img/load/' + i + '.png' + version);

            }
        }
        this.create = function () {
            game.state.start('loader');
        }
    };
    var loaderScene = function (game) {
        this.init = function () {
            //加载场景建立一个loadingLayer层
            loadingLayer = game.add.sprite();

            var bgImg = game.add.sprite(0, 0, 'bgImg');
            loadingLayer.addChild(bgImg);

            var load = game.add.sprite(0, 0, 'loop' + index);
            loadingLayer.addChild(load);

            timer = game.time.create(false);
            timer.loop(40, function () {

                if (index > 80) {
                    index = 0
                } else {
                    load.loadTexture('loop' + index, false);//逐帧播放图片
                }
                index++;
            })
            timer.start();
        }
        //加载图片
        this.preload = function () {
            for (var i = 81; i < 132; i++) {
                game.load.image('loadtrans' + i, prefix + 'img/loadtrans/' + i + '.png' + version);
            }
            for (var i = 132; i < 212; i++) {
                game.load.image('home' + i, prefix + 'img/home/' + i + '.png' + version);
            }
            game.load.image('home_title21', prefix + 'img/home_title21.png' + version);//行走的
            game.load.image('home_title22', prefix + 'img/home_title22.png' + version);//盒子
            game.load.image('home_line1', prefix + 'img/home_line1.png' + version);
            game.load.image('home_line2', prefix + 'img/home_line3.png' + version);
            game.load.image('home_line3', prefix + 'img/home_line2.png' + version);
            game.load.image('home_line4', prefix + 'img/home_line4.png' + version);
            game.load.image('home_line5', prefix + 'img/home_line5.png' + version);
            game.load.image('home_title1', prefix + 'img/home_title1.png' + version);
            game.load.image('box1', prefix + 'img/box/box1.png' + version);
            game.load.image('author1', prefix + 'img/box/author1.png' + version);
            game.load.image('box2', prefix + 'img/box/box2.png' + version);
            game.load.image('author2', prefix + 'img/box/author2.png' + version);
            game.load.image('box3', prefix + 'img/box/box3.png' + version);
            game.load.image('author3', prefix + 'img/box/author3.png' + version);
            game.load.image('box4', prefix + 'img/box/box4.png' + version);
            game.load.image('author4', prefix + 'img/box/author4.png' + version);
            game.load.image('arrow_up', prefix + 'img/arrow_up.png' + version);

            game.load.image('detail_box1', prefix + 'img/detail/detail_box1.png' + version);
            game.load.image('detail_box12', prefix + 'img/detail/detail_box12.png' + version);
            game.load.image('detail_box2', prefix + 'img/detail/detail_box2.png' + version);
            game.load.image('detail_close', prefix + 'img/detail/detail_close.png' + version);
            game.load.image('detail_pic_box', prefix + 'img/detail/detail_pic_box.png' + version);
            game.load.image('detail_pic_box1', prefix + 'img/detail/detail_pic_box1.png' + version);

            game.load.image('detail_intro_mask', prefix + 'img/detail/detail_intro_mask.png' + version);

            game.load.image('arrow_left', prefix + 'img/arrow_left.png' + version);
            game.load.image('arrow_right', prefix + 'img/arrow_right.png' + version);

            game.load.image('music_off', prefix + 'img/music_off.png' + version);
            game.load.image('music_on', prefix + 'img/music_on.png' + version);

 			game.load.image('mainImg', prefix + 'img/home_main_box.png' + version);
 			
            game.load.image('tran1_plat', prefix + 'img/tran1/tran1_plat.png' + version);
            for (var i = 11; i < 20; i++) {
                game.load.image('tran' + i, prefix + 'img/tran1/tran' + i + '.png' + version);
            }
            for (var i = 1; i < 23; i++) {
                game.load.image('tran2' + i, prefix + 'img/tran2/tran2' + i + '.png' + version);
            }
            for (var i = 1; i < 7; i++) {
                game.load.image('tran3' + i, prefix + 'img/tran3/tran3' + i + '.png' + version);
            }
            for (var i = 0; i < 5; i++) {
                game.load.image('float_box' + (i + 1), prefix + 'img/floatbox/float_box' + (i + 1)+'.png' + version);
            }
            for (var i = 0; i < 10; i++) {
                game.load.image('box' + (i + 1), prefix + 'img/box/box' + (i + 1)+'.png' + version);
            }
            for (var i = 0; i < 10; i++) {
                game.load.image('author' + (i + 1), prefix + 'img/box/author' + (i + 1)+'.png' + version);
            }
            for(var i=0;i<countNum;i++){
                game.load.image( "detail_author"+(i+1),prefix +"img/detail/detail_author"+(i+1)+".png"+ version);
            }
            //加载完成
            game.load.onLoadComplete.addOnce(function () {
                    timer.pause();
//              	加载完成destroy掉loadingLayer层
                    loadingLayer.destroy();
//        			跳转到主场景
                    game.state.start('game');
                    document.getElementById("music").play();
            })
        }
    }
    var gameScene = function (game) {

        this.create = function () {

            //主场景建立一个containerLayer层; 添加到游戏世界中，也就是最底层
            containerLayer = game.add.sprite();
            game.world.addChild(containerLayer);

            initMusic();

            //logo 音乐按钮等公共样式放在publicLayer层;
            publicLayer = game.add.sprite();
            game.world.addChild(publicLayer);

            //把背景添加到主体层
            var bgImg = game.add.sprite(0, 0, 'bgImg');
            containerLayer.addChild(bgImg);

            page = game.add.sprite();
            containerLayer.addChild(page);



            //场景一
            page1_scene();
            function page1_scene() {
                page1 = game.add.sprite();
                containerLayer.addChild(page1);

                //接着最开始的序列帧播放的层级
                homeLoop = game.add.sprite(0, 0, 'home' + index_home);
                page1.addChild(homeLoop);

                homeLoop.alpha = 0;
                homeLoop.x = 320;
                homeLoop.y = 570;
                homeLoop.anchor.set(0.5, 0.5);

                //最开始的序列帧层级
                var startLoop = game.add.sprite(0, 0, 'loadtrans' + index_container);
                page1.addChild(startLoop);

                timer=game.time.create(false);
                
                //序列帧播放
                timer = game.time.create(false);
                timer.loop(50, function () {
                    index_container++;
                    if (index_container >= 132) {
                        //第一组播放摧毁掉   播放第二组
                        startLoop.destroy();

                        homeLoop.alpha = 1;

                        index_home++;

                        if (index_home >= 212) {
                            timer.pause();//暂停计时器
                            timer =null;

                            mainImg = game.add.sprite(0,0,"mainImg");
				            page1.addChild(mainImg);
				            mainImg.x=224;
				            mainImg.y=407;

                            var homeIndex=132;
                            var isMove = false;
                            var isStop = false;
                            var startX,endX;
                            var startmoveDistance,endmoveDistance;
                            var home_main_boxArr = [];

                            var homes=game.add.sprite();
                            page1.addChild(homes)

                            page1Group = game.add.sprite();
                            page1.addChild(page1Group);
                            var home=game.add.sprite(0,0,'home'+homeIndex);
                            homes.addChild(home);
                            home.alpha=0;

                            home.inputEnabled=true;
                            home.events.onInputDown.add(function (){

                                isMove = true;
                                startX = game.input.mouse.input.x;
                                endX = startX;
                                game.input.addMoveCallback(move_by,home);

                                if(mainImgB == false) {
                                    page1.removeChild(mainImg);
                                } else{
                                    homes.removeChild(mainImg);
                                }
                            })
                            home.events.onInputUp.add(function () {
                                game.input.deleteMoveCallback(move_by,home);
                                if(homeIndex<211&&homeIndex>205){

                                    homeLoop.alpha = 1;
                                    home.alpha=0;
                                    mainImg = game.add.sprite(0,0,"mainImg");
                                    homes.addChild(mainImg);
                                    mainImg.x=224;
                                    mainImg.y=407;
                                    mainImgB = true;
                                    //点击进入的点击事件
                                    mainImg.inputEnabled = true; //开启输入事件;
                                    mainImg.events.onInputDown.add(function () {

                                        homes.removeChild(mainImg);
                                        var homeLoopScale = game.add.tween(homeLoop.scale).to({x: 2,y: 2}, 800, Phaser.Easing.Linear.Out, true);
                                        var homeLoopAlpha = game.add.tween(homeLoop).to({alpha: 0}, 800, Phaser.Easing.Linear.Out, true);
                                        var page1GroupAlpha = game.add.tween(page1Group).to({alpha: 0}, 500, Phaser.Easing.Linear.Out, true);

                                        page1GroupAlpha.onComplete.add(function () {
                                            //场景一摧毁
                                            page1.destroy();
                                            initPageList(cur_index);
                                        })
                                        mainImg.inputEnabled=false;
                                    })
                                }
                                if(homeIndex<139&&homeIndex>131){

                                    homeLoop.alpha = 1;
                                    home.alpha=0;
                                    mainImg = game.add.sprite(0,0,"mainImg");
                                    homes.addChild(mainImg);
                                    mainImg.x=224;
                                    mainImg.y=407;
                                    mainImgB = true;
                                    //点击进入的点击事件
                                    mainImg.inputEnabled = true; //开启输入事件;
                                    mainImg.events.onInputDown.add(function () {


                                        homes.removeChild(mainImg);
                                        var homeLoopScale = game.add.tween(homeLoop.scale).to({x: 2,y: 2}, 800, Phaser.Easing.Linear.Out, true);
                                        var homeLoopAlpha = game.add.tween(homeLoop).to({alpha: 0}, 800, Phaser.Easing.Linear.Out, true);
                                        var page1GroupAlpha = game.add.tween(page1Group).to({alpha: 0}, 500, Phaser.Easing.Linear.Out, true);

                                        page1GroupAlpha.onComplete.add(function () {
                                            //场景一摧毁
                                            page1.destroy();
                                            initPageList(cur_index);

                                        })
                                        mainImg.inputEnabled=false;
                                    })
                                }
                            })
                            function move_by(){
                                homeLoop.alpha = 0;
                                home.alpha=1;

                                    if(isMove){
                                        startX = endX;
                                        endX = game.input.mouse.input.x;

                                        if(isStop) {
                                            if(homeIndex>172){
                                                endX = startX-10;
                                            } else {
                                                endX = startX+10;
                                            }
                                        }
                                        if(endX > startX){
                                            homeIndex--;
                                            if(homeIndex < 133)homeIndex = 211;
                                        }else if(endX < startX){
                                            homeIndex++;

                                            if(homeIndex > 211)homeIndex = 132;
                                        }
                                        home.loadTexture('home'+homeIndex)
                                    }

                                    if(isMove){
                                        startX = endX;
                                        endX = game.input.mouse.input.x;

                                        if(isStop) {
                                            if(homeIndex>172){
                                                endX = startX-10;
                                            } else {
                                                endX = startX+10;
                                            }
                                        }
                                        if(endX > startX){
                                            homeIndex--;
                                            if(homeIndex < 133)homeIndex = 211;
                                        }else if(endX < startX){
                                            homeIndex++;

                                            if(homeIndex > 211)homeIndex = 132;
                                        }
                                        home.loadTexture('home'+homeIndex)
                                    }

                            }
                            //调用行走的盒子字体动画
                            lineAnimation();

                        } else {
                            homeLoop.loadTexture('home' + index_home, false);//逐帧播放图片
                        }
                    } else {
                        startLoop.loadTexture('loadtrans' + index_container, false);//逐帧播放图片
                    }
                })
                timer.start();

            }

            //行走的盒子文字动画
            function lineAnimation() {
                var home_title1 = game.add.sprite(53, 635, 'home_title1');//红色行走的盒子
                home_title1.alpha = 0;//先隐藏

                var runTx = game.add.sprite(0, 700, 'home_title21');
                var runBTx = game.add.sprite(640, 650, 'home_title22');
                var home_line1 = game.add.sprite(640, 600, 'home_line1');
                var home_line2 = game.add.sprite(-200, 810, 'home_line2');
                var home_line3 = game.add.sprite(-200, 820, 'home_line3');
                var home_line4 = game.add.sprite(640, 650, 'home_line4');
                var home_line5 = game.add.sprite(640, 650, 'home_line5');

                page1Group.addChild(home_title1);
                page1Group.addChild(runTx);
                page1Group.addChild(runBTx);
                page1Group.addChild(home_line5);
                page1Group.addChild(home_line4);
                page1Group.addChild(home_line1);
                page1Group.addChild(home_line2);
                page1Group.addChild(home_line3);

                //行走的盒子  运动
                var runBox = game.add.tween(runTx).to({x: 55, y: 696}, 800, Phaser.Easing.Linear.Out, true);
                var runBox = game.add.tween(runBTx).to({x: 333, y: 635}, 800, Phaser.Easing.Linear.Out, true);
                var runLine5 = game.add.tween(home_line5).to({x: -50, y: 714}, 200, Phaser.Easing.Linear.Out, false);
                var runLine4 = game.add.tween(home_line4).to({x: 115, y: 710}, 300, Phaser.Easing.Linear.Out, false);
                var runLine1 = game.add.tween(home_line1).to({x: 555, y: 637}, 300, Phaser.Easing.Linear.Out, false);
                var runLine2 = game.add.tween(home_line2).to({x: 175, y: 787}, 300, Phaser.Easing.Linear.Out, false);
                var runLine3 = game.add.tween(home_line3).to({x: 263, y: 808}, 300, Phaser.Easing.Linear.Out, false);
                var runHome1 = game.add.tween(home_title1).to({alpha: 1}, 100, Phaser.Easing.Linear.Out, false, 0, -1, true);

                runBox.onComplete.add(function () {
                    runLine5.start();
                    runLine5.onComplete.add(function () {
                        runLine4.start();
                    })
                    runLine4.onComplete.add(function () {
                        runLine1.start();
                    })
                    runLine1.onComplete.add(function () {
                        runLine2.start();
                    })
                    runLine2.onComplete.add(function () {
                        runLine3.start();
                    })
                    runLine3.onComplete.add(function () {
                        runHome1.start();
                        //提示的动态圆圈
                        circle(240,426,page1,0xffffff);
                        //点击进入的点击事件
                        mainImg.inputEnabled = true; //开启输入事件;
                        mainImg.events.onInputDown.add(function () {

                        	page1.removeChild(mainImg);
                            var homeLoopScale = game.add.tween(homeLoop.scale).to({x: 2,y: 2}, 800, Phaser.Easing.Linear.Out, true);
                            var homeLoopAlpha = game.add.tween(homeLoop).to({alpha: 0}, 800, Phaser.Easing.Linear.Out, true);
                            var page1GroupAlpha = game.add.tween(page1Group).to({alpha: 0}, 500, Phaser.Easing.Linear.Out, true);

                            page1GroupAlpha.onComplete.add(function () {
                                //场景一摧毁
                                page1.destroy();
                                initPageList(cur_index);

                            })
                            mainImg.inputEnabled=false;
                        })
                    })

                })
            }


            function initPageList(cur_index) {
                showBox = game.add.sprite();
                page.addChild(showBox);

                //浮动方块
                var float_boxArr = [[62, 136], [140, 100], [418, 581], [509, 705], [534, 595]];
                for (var i = 0; i < 5; i++) {
                    var float_box = game.add.sprite(0, 0,'float_box' + (i + 1));

                    showBox.addChild(float_box);

                    float_box.x = float_boxArr[i][0];
                    float_box.y = float_boxArr[i][1];

                    float_box.alpha = 0;
                    game.add.tween(float_box).to({alpha: 1},1000, Phaser.Easing.Linear.Out, true)
                    game.add.tween(float_box).to({y: float_boxArr[i][1] + 10}, 1000, Phaser.Easing.Linear.Out, true,0,-1,true)

                    //盒子
                    var box1 = game.add.sprite();
                    var box1Bmp = game.add.sprite(0, 0, 'box' + (cur_index + 1));

                    showBox.addChild(box1);
                    box1.addChild(box1Bmp);

                    box1.x = (640 - box1Bmp.width) / 2;
                    box1.y = 80 - 49;
                }



                //作者
                var author1 = game.add.sprite(0, 0, 'author' + (cur_index + 1));
                showBox.addChild(author1);

                author1.x = (640 - author1.width) / 2;
                author1.y = 820;

                author1.alpha = 0;

                game.add.tween(author1).to({y: 810}, 600, Phaser.Easing.Linear.Out, true, 600);
                game.add.tween(author1).to({alpha: 1}, 600, Phaser.Easing.Linear.Out, true, 600).onComplete.add(function(){
                    if(cur_index == 3){
                        circle(270,300,showBox,0x000000);
                    }
                   else{
                        circle(270,300,showBox,0xffffff);
                    }
                });
                //向上滑
                var arrow_up = game.add.sprite(0, 0, 'arrow_up');
                showBox.addChild(arrow_up);

                arrow_up.x = (640 - arrow_up.width) / 2;
                arrow_up.y = gameHeight - 50;

                arrow_up.alpha = 0;

                var swipeDownOnoff = false;
                game.add.tween(arrow_up).to({alpha: 1}, 300, Phaser.Easing.Linear.Out, true, 900).onComplete.add(function () {

                    $('body').on('swipeUp', function () {
                        clickDetail = false;
                        if (swipeDownOnoff)return false;
                        swipeDownOnoff = true;

                        game.add.tween(showBox).to({y: -gameHeight}, 600, Phaser.Easing.Linear.Out, true).onComplete.add(function () {
                            page.removeChild(showBox);

                            showBox = null;
                            cur_index++;

                            if(cur_index >= countNum){
                                cur_index = countNum - 1;
                                $('#share_page').fadeIn();
                                $('.share_btn').on('tap',function(){
                                    $('.share_wrap').hide();
                                    $('.share_tips').fadeIn();
                                    $('body').on('tap',function(){
                                        $('body').off('tap');
                                        $('.share_wrap').fadeIn();
                                        $('.share_tips').hide();
                                    });
                                    return false;
                                });
                                $('#share_page').on('swipeDown',function(){
                                    $('#share_page').off('swipeDown');
                                    $(this).fadeOut();
                                    setTimeout(function(){
                                        switch(curTrans){
                                            case 0:
                                                translate1(cur_index);
                                                break;
                                            case 1:
                                                translate2(cur_index);
                                                break;
                                            case 2:
                                                translate3(cur_index);
                                                break;
                                        }
                                        curTrans++;
                                        if(curTrans == 3)curTrans = 0;
                                        cur_pic = 0;
                                    },500);
                                });
                            }else{
                                switch(curTrans){
                                    case 0:
                                        translate1(cur_index);
                                        break;
                                    case 1:
                                        translate2(cur_index);
                                        break;
                                    case 2:
                                        translate3(cur_index);
                                        break;
                                }
                                curTrans++;
                                if(curTrans == 3)curTrans = 0;
                                cur_pic = 0;
                            }
                        })
                    })
                    $('body').on('swipeDown', function () {
                        clickDetail = false;
                        if (cur_index == 0) {
                            return false;
                        }
                        if (swipeDownOnoff)return false;
                        swipeDownOnoff = true;

                        game.add.tween(showBox).to({y: gameHeight}, 600, Phaser.Easing.Linear.Out, true).onComplete.add(function () {
                            page.removeChild(showBox);
                            showBox = null;
                            cur_index--;

                            switch (curTrans) {
                                case 0:
                                    translate1(cur_index);
                                    break;
                                case 1:
                                    translate2(cur_index);
                                    break;
                                case 2:
                                    translate3(cur_index);
                                    break;
                                    curTrans++;
                                    if (curTrans == 3)curTrans = 0;
                                    cur_pic = 0;
                            }
                        });
                    })
                    game.add.tween(arrow_up).to({y:gameHeight-60}, 600, Phaser.Easing.Linear.Out, true,0,-1,true);
                });

                showBox.inputEnabled = true; //开启输入事件;
                showBox.events.onInputDown.add(go_showDetail_down);
                showBox.events.onInputUp.add(go_showDetail_up);
                var go_showDetail_downY;
                function go_showDetail_down(e){
                    go_showDetail_downY=game.input.mouse.input.y;
                }
                function go_showDetail_up(e){
                    if(Math.abs(go_showDetail_downY-game.input.mouse.input.y)>5 || !go_showDetail_downY || !showDetail_flag) return false;
                    if(showDetail_flag ==true){
                        swipeDownOnoff = true;
                        var box1Alpha = game.add.tween(showBox).to({alpha: 0}, 800, Phaser.Easing.Linear.Out, true);
                        box1Alpha.onComplete.add(function () {
                            showDetail(cur_index);
                            clickDetail = true;
                        })
                        showDetail_flag =false;
                    }
                }


                //进入详情页
                function showDetail(cur_index) {

                    //详情页层级
                    var detail_wrap = game.add.sprite();
                    page.addChild(detail_wrap);

                    detail_wrap.alpha = 1;
                    //详情页浮动的方块
                    var detail_box1 =game.add.sprite(0,0,'detail_box1');
                    detail_wrap.addChild(detail_box1);

                    detail_box1.x = 90;
                    detail_box1.y = 94;

                    detail_box1.alpha = 0;

                    game.add.tween(detail_box1).to({alpha: 1}, 300, Phaser.Easing.Linear.Out, true);
                    game.add.tween(detail_box1).to({y: 104}, 1000, Phaser.Easing.Linear.Out, true,0,-1,true);


                    var detail_box12 = game.add.sprite(0,0,'detail_box12');
                    detail_wrap.addChild(detail_box12);

                    detail_box12.x = 125;
                    detail_box12.y = 126;

                    detail_box12.alpha = 0;

                    game.add.tween(detail_box12).to({alpha: 1}, 300, Phaser.Easing.Linear.Out, true,300);
                    game.add.tween(detail_box12).to({y: 136}, 1000, Phaser.Easing.Linear.Out, true,0,-1,true);

                    var detail_box2 = game.add.sprite(0,0,'detail_box2');
                    detail_wrap.addChild(detail_box2);

                    detail_box2.x = 606;
                    detail_box2.y = 499;

                    detail_box2.alpha = 0;

                    game.add.tween(detail_box2).to({alpha: 1}, 300, Phaser.Easing.Linear.Out, true,600);
                    game.add.tween(detail_box2).to({y: 509}, 1000, Phaser.Easing.Linear.Out, true,0,-1,true);

                    var detail_close = game.add.sprite();
                    detail_wrap.addChild(detail_close);

                    detail_close.x = 540;
                    detail_close.y = 112;

                    detail_close.alpha = 0;

                    var detail_closeBmp = game.add.sprite(0,0,'detail_close');
                    detail_close.addChild(detail_closeBmp);


                    game.add.tween(detail_close).to({alpha: 1}, 300, Phaser.Easing.Linear.Out, true,1000);
                    game.add.tween(detail_close).to({y: 122}, 1000, Phaser.Easing.Linear.Out, true,0,-1,true);


                    //详情页作者
                    var detail_author1 = game.add.sprite(0,0,'detail_author'+(cur_index+1));
                    detail_wrap.addChild(detail_author1);

                    detail_author1.x = (640-detail_author1.width)/2;
                    detail_author1.y = 559;

                    detail_author1.alpha = 0;

                    game.add.tween(detail_author1).to({y: 549}, 300, Phaser.Easing.Linear.Out, true);
                    game.add.tween(detail_author1).to({alpha:1}, 300, Phaser.Easing.Linear.Out, true);

                    var detail_intro_wrap = game.add.sprite();
                    detail_wrap.addChild(detail_intro_wrap);

                    detail_intro_wrap.x = 320;
                    detail_intro_wrap.y = 710;

                    var detail_intro = game.add.text(-220,0,'',{font: '400 20px 微软雅黑',fill:'#fff',align: 'left', wordWrap: true, wordWrapWidth: 450});
                    detail_intro_wrap.addChild(detail_intro);


                    detail_intro.text = introArr[cur_index];
                    detail_intro.lineSpacing=8;

                    detail_intro.alpha = 0;
                    game.add.tween(detail_intro).to({alpha:1},300, Phaser.Easing.Linear.Out, true,200);

                 

                    var detail_intro_box = game.add.graphics();
                    detail_intro_wrap.addChild(detail_intro_box);
                    detail_intro_box.beginFill('0xfffff',1);
                    detail_intro_box.drawRect(-226,0,452,286);
                    detail_intro_box.endFill();
                    detail_intro.mask = detail_intro_box;
                    
                    var detail_intro_mask =  game.add.sprite(0,-0,'detail_intro_mask');

                    detail_intro_wrap.addChild(detail_intro_mask);

                    detail_intro_mask.x = -226;
                    detail_intro_mask.alpha = 0;

                    game.add.tween(detail_intro_mask).to({alpha:1},300, Phaser.Easing.Linear.Out, true,300);


                    detail_closeBmp.inputEnabled = true; //开启输入事件;
                    detail_closeBmp.events.onInputDown.add(function () {
                      if(!showDetail_flag){
                        showDetail_flag=true;
                        swipeDownOnoff = false;
                        clickDetail = true;
                        $('body').off('swipeLeft');
                        $('body').off('swipeRight');
                          game.add.tween(showBox).to({alpha: 1}, 300, Phaser.Easing.Linear.Out, true);
                          game.add.tween(detail_wrap).to({alpha: 0}, 100, Phaser.Easing.Linear.Out, true);

                        }
                    })

                    var detail_pic_box = game.add.sprite();
                    detail_wrap.addChild(detail_pic_box);

                    var detail_pic_boxBmp = game.add.sprite(0,0,'detail_pic_box1');
                    detail_pic_box.addChild(detail_pic_boxBmp);

                    detail_pic_box.x = (gameWidth - detail_pic_boxBmp.width) / 2;
                    detail_pic_box.y = 28;

                    var pic_mask = game.add.graphics();
                    detail_pic_box.addChild(pic_mask);

                    pic_mask.beginFill('#ff002a',0);
                    pic_mask.drawRect(25,19,352,471);
                    pic_mask.endFill();
                    var pic_wrap = game.add.sprite();

                    detail_pic_box.addChild(pic_wrap);
                    pic_wrap.mask = pic_mask;
                    pic_wrap.y = 19;


                    //加载图片
                   loadPic();
                    function loadPic() {
                        if(clickDetail){

                            var prev_pic = cur_pic - 1;
                            if (prev_pic < 0) {
                                prev_pic = picArr[cur_index].length - 1;
                            }
                            var next_pic = cur_pic + 1;
                            if (next_pic == picArr[cur_index].length) {
                                next_pic = 0;
                            }
                            pic_wrap.x = 21;
                            var pic1 = game.add.image(0, 0, 'prev_pic'+loadPicIndex);
                            pic_wrap.addChild(pic1);
                            pic1.x = -523;
                            var pic3 = game.add.image(0, 0, 'next_pic'+loadPicIndex);
                            pic_wrap.addChild(pic3);
                            pic3.x = 523;
                            var pic2 = game.add.image(0, 0, 'cur_pic'+loadPicIndex);
                            pic_wrap.addChild(pic2);
                            pic2.x = 0;
                        }else{

                        var prev_pic = cur_pic - 1;
                        if (prev_pic < 0) {
                            prev_pic = picArr[cur_index].length - 1;
                        }
                        var next_pic = cur_pic + 1;
                        if (next_pic == picArr[cur_index].length) {
                            next_pic = 0;
                        }
                        loadPicIndex++;
                        game.load.image("prev_pic"+loadPicIndex,picArr[cur_index][prev_pic]);
                        game.load.image("cur_pic"+loadPicIndex,picArr[cur_index][cur_pic]);
                        game.load.image("next_pic"+loadPicIndex,picArr[cur_index][next_pic]);
                        game.load.start();

                        game.load.onLoadComplete.add(function () {

                            pic_wrap.x = 21;
                            var pic1 = game.add.image(0, 0, 'prev_pic'+loadPicIndex);
                            pic_wrap.addChild(pic1);
                            pic1.x = -523;
                            var pic3 = game.add.image(0, 0, 'next_pic'+loadPicIndex);
                            pic_wrap.addChild(pic3);
                            pic3.x = 523;
                            var pic2 = game.add.image(0, 0, 'cur_pic'+loadPicIndex);
                            pic_wrap.addChild(pic2);
                            pic2.x = 0;
                        })

                        }
                    }

                    //向左滑动
                    $('body').on('swipeLeft', function () {
                        clickDetail = false;
                        game.add.tween(pic_wrap).to({ x: -502},300, Phaser.Easing.Linear.Out, true).onComplete.add(function(){
                         cur_pic++;
                         if (cur_pic == picArr[cur_index].length) {
                         cur_pic = 0;
                         }
                         loadPic();
                         })

                     });

                    //向右滑动
                    $('body').on('swipeRight', function () {
                        clickDetail = false;
                     game.add.tween(pic_wrap).to({ x:544}, 300, Phaser.Easing.Linear.Out, true).onComplete.add(function(){
                     cur_pic--;
                     if (cur_pic < 0) {
                     cur_pic = picArr[cur_index].length - 1;
                     }
                     loadPic();
                     })
                    });


                    
                    //滑动答案解析
                    var scrollH = detail_intro.height-150;//滚动高度
                    var isMove = false;
                    var startH,endH;
                    var introY = 0;

                    detail_intro_wrap.inputEnabled=true;
                    page.inputEnabled=true;

                    detail_intro_wrap.events.onInputDown.add(scrollStart);

                    game.input.addMoveCallback(scrollMove,detail_intro_wrap);

                    page.events.onInputUp.add(scrollStart);

                    function scrollStart(e){
                        isMove = true;
                        startH = game.input.mouse.input.y;
                    }
                    function scrollMove(e){
                        if(isMove){
                            endH = game.input.mouse.input.y;
                            if(endH < startH){
                                introY = introY - 10;
                                if(introY <= (0 - scrollH)){
                                    introY = 0 - scrollH;
                                }
                                detail_intro.y = introY;

                            }else if(endH > startH){
                                introY = introY + 10;
                                if(introY >= 0){
                                    introY = 0;
                                }
                                detail_intro.y = introY;
                            }
                        }
                    }
                    function scrollEnd(e){
                        isMove = false;
                    }
                    var arrow_left_btn = game.add.sprite();
                    detail_pic_box.addChild(arrow_left_btn);

                    var arrow_left = game.add.image(0,0,'arrow_left');
                    arrow_left_btn.addChild(arrow_left);

                    arrow_left.x = 22;
                    arrow_left.y = (detail_pic_boxBmp.height-arrow_left.height)/2;

                    game.add.tween(arrow_left).to({alpha:0.6},600, Phaser.Easing.Linear.Out, true,0,-1,true);




                    var arrow_right_btn = game.add.sprite();
                    detail_pic_box.addChild(arrow_right_btn);

                    var arrow_right = game.add.image(0,0,'arrow_right');
                    arrow_right_btn.addChild(arrow_right);


                    arrow_right.x = detail_pic_boxBmp.width-42;
                    arrow_right.y = (detail_pic_boxBmp.height-arrow_left.height)/2;

                    game.add.tween(arrow_right).to({alpha:0.6},600, Phaser.Easing.Linear.Out, true,0,-1,true);


                    arrow_left_btn.inputEnabled = true; //开启输入事件;
                    arrow_left_btn.events.onInputDown.add(function () {

                        clickDetail = false;
                    game.add.tween(pic_wrap).to({x:21+523}, 300, Phaser.Easing.Linear.Out, true).onComplete.add(function(){
                            cur_pic--;
                            if(cur_pic < 0){
                                cur_pic = picArr[cur_index].length-1;
                            }
                        loadPic();
                        });
                    });

                    arrow_right_btn.inputEnabled = true; //开启输入事件;
                    arrow_right_btn.events.onInputDown.add(function () {
                        clickDetail = false;
                        game.add.tween(pic_wrap).to({x:21-523}, 300, Phaser.Easing.Linear.Out, true).onComplete.add(function(){
                            cur_pic++;
                            if(cur_pic == picArr[cur_index].length){
                                cur_pic = 0;
                            }
                            loadPic();
                        });
                    })

                }

            }

            //动画一
            function translate1(cur_index){
                var tran1_wrap = game.add.sprite();
                page.addChild(tran1_wrap);
                var tran1Arr = [gameHeight - 73, gameHeight - 73 - 64, gameHeight - 73 - 64 - 56, gameHeight - 73 - 64 - 56 - 49, gameHeight - 73 - 64 - 56 - 49 - 44, gameHeight - 73 - 64 - 56 - 49 - 44 - 38 - 15, gameHeight - 73 - 64 - 56 - 49 - 44 - 38 - 15 - 32 - 33, gameHeight - 73 - 64 - 56 - 49 - 44 - 38 - 15 - 32 - 33 - 24 - 53, gameHeight - 73 - 64 - 56 - 49 - 44 - 38 - 15 - 32 - 33 - 24 - 53 - 15 - 84];

                var tran1_els = game.add.sprite();

                tran1_wrap.addChild(tran1_els);

                var tranArr = [];

                for (var i = 0; i < 9; i++) {
                    var tran1 = game.add.sprite(0, 0, 'tran1' + (i + 1));

                    tran1_wrap.addChild(tran1);

                    tranArr.push(tran1);

                    tran1_els.addChild(tran1);

                    tran1.x = (640 - tran1.width) / 2;
                    tran1.y = -tran1.height;

                    game.add.tween(tran1).to({y: tran1Arr[i] - 51}, 500, Phaser.Easing.Linear.Out, true, 100 + i * 100);
                }

                var tran1_plat = game.add.sprite(0, 0, 'tran1_plat');

                tranArr.push(tran1_plat);
                tran1_els.addChild(tran1_plat);

                tran1_plat.x = (gameWidth - tran1_plat.width) / 2;
                tran1_plat.y = -tran1_plat.height;

                var tran1_platAnimation = game.add.tween(tran1_plat).to({y: gameHeight - 73 - 64 - 56 - 49 - 44 - 38 - 15 - 32 - 33 - 24 - 53 - 15 - 84 - 51 - tran1_plat.height - 30}, 800, Phaser.Easing.Linear.Out, true, 1100);

                tran1_platAnimation.onComplete.add(function () {

                    var tran1_box = game.add.sprite();

                    tran1_wrap.addChild(tran1_box);

                    tran1_box.x = 320;
                    tran1_box.y = gameHeight - 73 - 64 - 56 - 49 - 44 - 38 - 15 - 32 - 33 - 24 - 53 - 15 - 84 - 51 - tran1_plat.height - 1;

                    var tran1_boxBmp = game.add.sprite(0, 0, 'box' + (cur_index + 1));
                    tran1_box.addChild(tran1_boxBmp);

                    tran1_boxBmp.x = -(tran1_boxBmp.width / 2) + 7;
                    tran1_boxBmp.y = -tran1_boxBmp.height + 3;

                    tran1_box.scale.x = 0;
                    tran1_box.scale.y = 0;

                    var tran1_boxAnimation = game.add.tween(tran1_box.scale).to({
                        x: 0.2,
                        y: 0.2
                    }, 300, Phaser.Easing.Linear.Out, true, 800);

                    tran1_boxAnimation.onComplete.add(function () {

                        var tran1Remove = game.add.tween(tran1_box.scale).to({
                            x: 1,
                            y: 1
                        }, 1000, Phaser.Easing.Linear.Out, true, 500);
                        var tran1Remove = game.add.tween(tran1_box).to({x: 313,y: 80 + 597}, 1000, Phaser.Easing.Linear.Out, true, 500);
                        for (var i = 0; i < tranArr.length; i++) {
                            game.add.tween(tranArr[i]).to({y: gameHeight}, 800, Phaser.Easing.Linear.Out, true, 100 * i + 500);
                        }

                        tran1Remove.onComplete.add(function (event) {
                            tran1_wrap.removeChild(tran1_box);
                            tran1_box = null;
                            initPageList(cur_index);
                        })
                    });
                })
            }


            //动画二
            function  translate2(cur_index){
                var basePos = [214, -217];
                var tran2Arr = [
                    [basePos[0], basePos[1]],
                    [basePos[0] + 71, basePos[1] + 74],
                    [basePos[0] + 71 + 30, basePos[1] + 74 + 52],
                    [basePos[0] + 71 + 30 * 2, basePos[1] + 74 + 52 * 2],
                    [basePos[0] + 71 + 30 * 3, basePos[1] + 74 + 52 * 3],
                    [basePos[0] + 71 + 30 * 4, basePos[1] + 74 + 52 * 4],
                    [basePos[0] + 71 + 30 * 5, basePos[1] + 74 + 52 * 5],
                    [basePos[0] + 71 + 30 * 6, basePos[1] + 74 + 52 * 6],
                    [basePos[0] + 71 + 30 * 5, basePos[1] + 74 + 52 * 7],
                    [basePos[0] + 71 + 30 * 4, basePos[1] + 74 + 52 * 8],
                    [basePos[0] + 71 + 30 * 3, basePos[1] + 74 + 52 * 9],
                    [basePos[0] + 71 + 30 * 2, basePos[1] + 74 + 52 * 10],
                    [basePos[0] + 71 + 30, basePos[1] + 74 + 52 * 11],
                    [basePos[0] + 71, basePos[1] + 74 + 52 * 12],
                    [basePos[0] + 71 - 30, basePos[1] + 74 + 52 * 13],
                    [basePos[0] + 71, basePos[1] + 74 + 52 * 14],
                    [basePos[0] + 71 + 30, basePos[1] + 74 + 52 * 15],
                    [basePos[0] + 71 + 30 * 2, basePos[1] + 74 + 52 * 16],
                    [basePos[0] + 71 + 30 * 3, basePos[1] + 74 + 52 * 17],
                    [basePos[0] + 71 + 30 * 4, basePos[1] + 74 + 52 * 18],
                    [basePos[0] + 71 + 30 * 5, basePos[1] + 74 + 52 * 19],
                    [basePos[0] + 71 + 30 * 6, basePos[1] + 74 + 52 * 20]
                ];

                var tran2_wrap = game.add.sprite();
                page.addChild(tran2_wrap);

                var tran2_els = game.add.sprite();
                tran2_wrap.addChild(tran2_els);

                var tranArr = [];

                for (var i = 0; i < 22; i++) {
                    var tran2 = game.add.sprite(0, 0, 'tran2' + (22 - i));
                    tranArr.push(tran2);
                    tran2_els.addChild(tran2);

                    tran2.x = tran2Arr[i][0];
                    tran2.y = gameHeight;

                    game.add.tween(tran2).to({y: tran2Arr[i][1]}, 100, Phaser.Easing.Linear.Out, true, (22 - i) * 100);

                }
                game.add.tween(tran2_wrap).to({y: 434}, 2200, Phaser.Easing.Linear.Out, true);

                var tran2_box = game.add.sprite();
                tran2_wrap.addChild(tran2_box);

                tran2_box.x = 274;
                tran2_box.y = -177;

                var tran2_boxBmp = game.add.sprite(0, 0, 'box' + (cur_index + 1));

                tran2_box.addChild(tran2_boxBmp);

                tran2_boxBmp.x = -(tran2_boxBmp.width / 2) + 7;
                tran2_boxBmp.y = -tran2_boxBmp.height + 3;

                tran2_box.scale.x = 0;
                tran2_box.scale.y = 0;

                game.add.tween(tran2_box.scale).to({ x: 0.2, y: 0.2}, 100, Phaser.Easing.Linear.Out, true, 2200).onComplete.add(function () {
                        game.add.tween(tran2_box).to({y: 80 + 162, x: 313}, 1000, Phaser.Easing.Linear.Out, true, 500)
                        game.add.tween(tran2_box.scale).to({x: 1,y: 1}, 1000, Phaser.Easing.Linear.Out, true, 500).onComplete.add(function () {
                                tran2_wrap.removeChild(tran2_box);
                                tran2_box = null;
                                initPageList(cur_index);
                            });
                    });

                game.add.tween(tran2_els).to({y: gameHeight}, 500, Phaser.Easing.Linear.Out, true, 3000).onComplete.add(function () {
                    for (var i = 0; i < tranArr.length; i++) {
                        game.add.tween(tranArr[tranArr.length - 1 - i]).to({y: gameHeight}, 1000, Phaser.Easing.Linear.Out, true);
                    }
                });
            }

            //动画三
            function  translate3(cur_index){
                var tran3_wrap = game.add.sprite();
                page.addChild(tran3_wrap);

                var tran3_els = game.add.sprite();
                tran3_wrap.addChild(tran3_els);

                var tranArr = [];

                var tran3_plat = game.add.sprite(0, 0, 'tran33');

                tranArr.push(tran3_plat);
                tran3_els.addChild(tran3_plat);

                tran3_plat.x = 408;
                tran3_plat.y = 293;

                tran3_plat.alpha = 0;

                var tran33 = game.add.sprite(0, 0, 'tran31');

                tranArr.push(tran33);
                tran3_els.addChild(tran33);

                tran33.x = 80;
                tran33.y = gameHeight;

                var tran32 = game.add.sprite(0, 0, 'tran32');
                tranArr.push(tran32);

                tran3_els.addChild(tran32);

                tran32.x = 112;
                tran32.y = gameHeight;

                var tran31 = game.add.sprite(0, 0, 'tran31');

                tranArr.push(tran31);

                tran3_els.addChild(tran31);

                tran31.x = 80;
                tran31.y = gameHeight;

                game.add.tween(tran31).to({y: 825}, 600, Phaser.Easing.Linear.Out, true);
                game.add.tween(tran32).to({y: 596}, 600, Phaser.Easing.Linear.Out, true, 300);
                game.add.tween(tran33).to({y: 368}, 600, Phaser.Easing.Linear.Out, true, 600);
                game.add.tween(tran3_plat).to({alpha: 1}, 650, Phaser.Easing.Linear.Out, true, 900);

                var tran3_box = game.add.sprite();
                tran3_wrap.addChild(tran3_box);

                tran3_box.x = 490;
                tran3_box.y = 353;

                var tran3_boxBmp = game.add.sprite(0, 0, 'box' + (cur_index + 1));

                tran3_box.addChild(tran3_boxBmp);

                tran3_boxBmp.x = -(tran3_boxBmp.width / 2) + 7;
                tran3_boxBmp.y = -tran3_boxBmp.height + 3;

                tran3_box.scale.x = 0;
                tran3_box.scale.y = 0;

                game.add.tween(tran3_box.scale).to({x: 0.2,y: 0.2}, 100, Phaser.Easing.Linear.Out, true, 1200).onComplete.add(function () {
                        game.add.tween(tran3_box).to({y: 80 + 595, x: 313},1000, Phaser.Easing.Linear.Out, true,500)
                        game.add.tween(tran3_box.scale).to({x: 1,y: 1}, 1000, Phaser.Easing.Linear.Out, true, 500).onComplete.add(function () {

                                tran3_wrap.removeChild(tran3_box);
                                tran3_box = null;
                                initPageList(cur_index);
                            });
                    });
                setTimeout(function(){

                    game.add.tween(tran31).to({y: gameHeight}, 100, Phaser.Easing.Linear.Out, true,150);
                    game.add.tween(tran32).to({y: gameHeight}, 100, Phaser.Easing.Linear.Out, true,300);

                    game.add.tween(tran33).to({y: gameHeight}, 100, Phaser.Easing.Linear.Out, true,450);
                    game.add.tween(tran3_plat).to({y: gameHeight}, 100, Phaser.Easing.Linear.Out, true,600);

                 },2500)

            };

            //点击提示的圆
            function circle(x,y,PageType,CType) {

                var circle = game.add.sprite();
                PageType.addChild(circle);

                circle.x = x;
                circle.y = y;
                circle.alpha=1;
                circle.anchor.set(0.5,0.5);
                var circle_1 = game.add.graphics(50, 50);
                circle.addChild(circle_1);

                circle_1.beginFill(CType, 0.2);
                circle_1.drawCircle(0, 0, 60);

                var circle_2 = game.add.graphics(50, 50);
                circle.addChild(circle_2);

                circle_2.beginFill(CType, 0.5);
                circle_2.drawCircle(0, 0, 40);

                var circle_3 = game.add.graphics(50, 50);
                circle.addChild(circle_3);

                circle_3.beginFill(CType, 0.8);
                circle_3.drawCircle(0, 0, 20);

                game.add.tween(circle_2.scale).to({x: 1.4, y: 1.4}, 400, Phaser.Easing.Linear.Out, true, 0, -1, false);
                game.add.tween(circle_3.scale).to({x: 1.4, y: 1.4}, 400, Phaser.Easing.Linear.Out, true, 0, -1, false);
                game.add.tween(circle_1.scale).to({x: 1.4, y: 1.4}, 400, Phaser.Easing.Linear.Out, true, 0, -1, false);
                game.add.tween(circle_3).to({alpha: 0.6}, 400, Phaser.Easing.Linear.Out, true, 0, -1, false);
                game.add.tween(circle_2).to({alpha: 0.2}, 400, Phaser.Easing.Linear.Out, true, 0, -1, false);
                game.add.tween(circle_1).to({alpha: 0}, 400, Phaser.Easing.Linear.Out, true, 0, -1, false);
            }

            //音乐按钮控制
            var music,musicBtn,music_flag=false;
            function initMusic(){


                musicBtn =  game.add.sprite();

                musicBtn.x = 581;
                musicBtn.y = 22;

                var music_off =  game.add.image(0,0,'music_off');
                musicBtn.addChild(music_off);
                var music_on =  game.add.image(0,0,'music_on');
                musicBtn.addChild(music_on);
                var music_mask = game.add.graphics();
                musicBtn.addChild(music_mask);

                music_mask.beginFill('0xffffff',1);
                music_mask.drawRect(0,0,music_on.width,music_on.height);
                music_mask.endFill();
                music_on.mask = music_mask;
                music_mask.y = music_on.height;


                music_flag=true;

                var music_ani = game.add.tween(music_mask).to({y:0}, 500, Phaser.Easing.Linear.Out, true,0,-1,false);


                musicBtn.inputEnabled = true; //开启输入事件;
                musicBtn.events.onInputDown.add(function () {
                    if(music_flag){
                        $("#music")[0].pause();
                        music_ani.pause();
                        music_flag=false;

                    }else {
                        $("#music")[0].play();
                        music_ani.resume();
                        music_flag=true;

                    }
                })

            }
        }
        this.update=function(){

        }
    }

    game.state.add('boot',bootScene);
    game.state.add('loader',loaderScene);
    game.state.add('game',gameScene);
    game.state.start('boot');//启动第一个场景


})
