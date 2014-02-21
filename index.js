$(function(){
    //$(".add_button").click(add_timeline_element);
    
    function add_timeline_element(){
        var text_input = $('<input />', {
            type: "text",
            class: "t_text_area"
        });
        var button = $('<button />', {
            text: '-',
            class: "t_intect_button",
            click: function() {$(this).parent().remove();}
        });
        var timeline_element = $('<td />', {
            class: "timeline_element"
        });
        timeline_element.append(button);
        timeline_element.append(text_input);
        $(".t_inject_row").append(timeline_element);
    }
    
    function minimize_t_inject_container(){
        $(".add_button").toggle();
    }
    
    function create_twitter_bar(){
        var url = location.href
        var table_container = $("<table />", {
            class: "t_inject_container"
        });
            var row = $("<tr />", {
                        class: "t_inject_row"
                        });
                var menu = $("<td />", {
                    class: "menu"
                });
                    var add_element_button = $("<button />", {
                        text: '+',
                        class: "add_button t_intect_button",
                        click: function() {add_timeline_element();}
                    });
                    var minimize_button = $("<button />", {
                        text: 'm',
                        click: function() {minimize_t_inject_container();},
                        class: "minimize_button t_intect_button"
                    });
                    menu.append(add_element_button);
                    menu.append(minimize_button);
            row.append(menu);
        table_container.append(row);
        $('body').append(table_container);
    }
    create_twitter_bar();
    
    
    
    var scroll_point = 0;
    var done_scrolling;
    var counting = "false";
    var time_counter = 0.00;
    var consecutive_scrolls = 0.00;
    
    var scroll_ending = function () {
        console.log("done scrolling");
        clearInterval(counting);
        counting = "false";
        time_counter = 0.00;
    }
    $(document).scroll(function() {
        var new_scroll_point = $(document).scrollTop();
        var scroll_delta = scroll_point - new_scroll_point;
        if(scroll_delta < 0){
            scroll_delta = scroll_delta * (-1);
        }
        scroll_point = new_scroll_point;
        if(counting=="false"){
            counting = setInterval(function(){
                time_counter += 0.1;
            }, 100);
        } else{
            var scroll_over_time = scroll_delta/time_counter;
            console.log("scrolling over time:"+ scroll_over_time);
            clearTimeout(done_scrolling);
            done_scrolling = setTimeout(scroll_ending, 150);
            if(scroll_over_time > 400 && scroll_over_time < 3000){
                $(".add_button").hide();
            }
        }        
    });
});
                
                       
    /*
    var count_down = "cleared";
    var time_counter = 0;
    
    $(document).keydown(function(e){
        if(e.which == 13){
            if(count_down == "cleared"){
                count_down = setInterval(function(){
                                            time_counter++;
                                            console.log("time:" + time_counter);
                                        }, 1000);
            console.log("--start--");
            } else {
                clearInterval(count_down);
                count_down = "cleared";
                time_counter = 0;
                consecutive_scrolls = 0;
                console.log("--stop--");
            }
        }
    });
    */
    /*
    var done_scrolling;
    var consecutive_scrolls = 0.00;
    var counting = "false";
    var time_counter = 0.10;
    $(window).bind('scroll',function () {
        consecutive_scrolls += 1.00;
        if(counting=="false"){
            counting = setInterval(function(){
                time_counter += 0.01;
            }, 10);
        }
        var scroll_ratio = time_counter/consecutive_scrolls;
        console.log('scroll_ratio: ' + scroll_ratio);
        if(scroll_ratio < .030 && scroll_ratio > 0){
            console.log("-----scrolling fast------");
        }
        clearTimeout(done_scrolling);
        done_scrolling = setTimeout(scroll_ending, 100);
    });
    
    var scroll_ending = function () {
        console.log("done scrolling");
        counting == "false";
        consecutive_scrolls = 0.00;
        time_counter = 0.00;
    }
    */