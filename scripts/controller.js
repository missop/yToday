//实例化一个模块，用来控制所有控制器
angular.module('Controller', [])
    .controller('demoController', ['$scope', function ($scope) {
        console.log(1);
    }])

//页面有三部分内容：导航菜单、今日一刻、往期内容，因此可分为三个控制器
//    导航菜单
    .controller('navController',['$scope', function ($scope) {
        //导航数据
        $scope.navs = [
            {link: '#/today', text: '今日一刻', icon: 'icon-home'},
            {link: '#/older', text: '往期内容', icon: 'icon-file-empty'},
            {link: '#/author', text: '热门作者', icon: 'icon-pencil'},
            {link: '#/category', text: '栏目浏览', icon: 'icon-menu'},
            {link: '#/favourite', text: '我的喜欢', icon: 'icon-heart'},
            {link: '#/settings', text: '设置', icon: 'icon-cog'}
        ]

    }])

    .controller('todayController',['$scope','$http','$filter','$rootScope', function ($scope,$http,$filter,$rootScope) {

        var today = $filter('date')(new Date,'yyyy-MM-dd');

        //console.log(today);
        //console.log($http.success);

        //先设置固定内容
        $rootScope.title = '今日一刻';
        $rootScope.index = 0;
        $rootScope.loaded  = false;

        //发送请求
        $http({
            url:'./api/today.php',
            params:{today:today}
        }).success(function (info) {
            //console.log(info);
            $rootScope.loaded = true;

            //设置时间
            $scope.date  = info.date;
            //将数据传递给模型
            $scope.posts = info.posts;


        })

    }])
//往期内容
    .controller('olderController',['$scope','$http','$rootScope', function ($scope,$http,$rootScope) {

        $rootScope.index = 1;
        $rootScope.title = '往期内容';
        $rootScope.loaded  = false;

        $http({
            url:'./api/older.php'
        }).success(function (info) {
            //console.log(info);
            $rootScope.loaded = true;


            $scope.date  = info.date;
            $scope.posts = info.posts;
        })

    }])
//热门作者
    .controller('authorController',['$scope','$http','$rootScope', function ($scope,$http,$rootScope) {

        $rootScope.index = 2;
        $rootScope.title = '热门作者';
        $rootScope.loaded  = false;

        $http({
            url:'./api/author.php'
        }).success(function (info) {
            //console.log(info);
            $rootScope.loaded = true;


            $scope.all  = info.all;
            $scope.rec = info.rec;
        })

    }])
//栏目浏览
    .controller('categoryController',['$scope','$http','$rootScope', function ($scope,$http,$rootScope) {

        $rootScope.index = 3;
        $rootScope.title = '栏目浏览';
        $rootScope.loaded = false;

        $http({
            url:'./api/category.php'
        }).success(function (info) {

            //console.log(info.columns);
            //console.log(info.columns[0].name);

            $rootScope.loaded = true;
            $scope.categorys = info.columns;
            //console.log($scope.categorys);

        });


    }])
//我的喜欢
    .controller('favouriteController',['$scope','$rootScope', function ($scope,$rootScope) {

        $rootScope.index = 4;
        $rootScope.title = '我的喜欢';

    }])
//设置
    .controller('settingsController',['$scope','$rootScope', function ($scope,$rootScope) {

        $rootScope.index = 5;
        $rootScope.title = '设置';

    }])