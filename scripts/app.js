var Yike = angular.module('Yike', ['ngRoute', 'Controller']);

//根据要求，需要有两个页面，一个是以往的内容一个是今日内容
Yike.config(['$routeProvider', function ($routeProvider) {

    $routeProvider.when('/today', {

            templateUrl: './views/today.html',
            controller: 'todayController'
        })
        .when('/older', {
            templateUrl: './views/older.html',
            controller: 'olderController'
        })
        .when('/author',{
            templateUrl:'./views/author.html',
            controller:'authorController'
        })
        .when('/category',{
            templateUrl:'./views/category.html',
            controller:'categoryController'
        })
        .when('/favourite',{
            templateUrl:'./views/favourite.html',
            controller:'favouriteController'
        })
        .when('/settings',{
            templateUrl:'./views/settings.html',
            controller:'settingsController'
        })
        .otherwise({
            redirectTo: '/today'
        });

}]);

Yike.run(['$rootScope', function ($rootScope) {

    //console.log(1);
    //设置类名初始值
    $rootScope.collapsed = false;


/*    //获取所有的dd
        写错了位置，在这里无法获取导航栏，只有在toggle函数中才能获取
    var dds = document.querySelectorAll('.navs dd');
    console.log(dds);*/

    $rootScope.toggle = function () {

        //改变类名值
        $rootScope.collapsed = !$rootScope.collapsed;

        //获取所有的dd
        var dds = document.querySelectorAll('.navs dd');
        //console.log(dds);

        //判断当前在哪个页面，如果是false则为初始值，应该是侧导航栏，如果是true则为主页
        if ($rootScope.collapsed) {

            //console.log('zhuye');

            //当前位于主页,所以是动画的初始值
            for (var i = 0; i < dds.length; i++) {
                dds[i].style.transform = 'translate(0)';
                dds[i].style.transitionDelay = '.2s';
                dds[i].style.transitionDuration =  (i + 1) * .15 + 's';

            }

        }

        else {

            //当前位于侧导航栏
            var len = dds.length - 1;

            for (var j = len; j > 0; j--) {
                dds[j].style.transform = 'translate(-100%)';
                dds[j].style.transitionDelay = '';
                dds[j].style.transitionDuration =  (len - j) * .15 + 's';

            }


        }


    }


}])