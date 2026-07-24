$(function(){
    // コンテンツ１だけ残して他は消す
        $("#contents #tab1").siblings().hide();
                             // タブ１の他の兄弟たちを隠す。
                            //  この記述を書くと他のタブについての記述は必要なくなる  
             // タブ２も表示する   
               // $("#tab2").show(); 
               
     // 数字のaタグがクリックされたら
     $("#buttons a").on("click",function(){
         // コンテンツ４つとも非表示
         $("#contents div").hide();
         //クリックされたaタグの番号に相当するコンテンツを再表示
        $($(this).attr("href")).show(); 
        
        //すでについているcurrentクラスを削除
        $("#buttons a").removeClass("current");
        //クリックされたaタグにcurrentクラスを付ける
        $(this).addClass("current");    

    });

});
