$(function(){    
    function add_timeline_element(){
        var timeline_element_container = $('<li />');
            var timeline_element = $('<ul />', {
                class: "timeline_element"
            });
                var section_1 = $("<li />");
                var section_2 = $("<li />");
                    var close_button = $('<button />', {
                        text: '-',
                        class: "t_intect_button close_button",
                        click: function(){$(this).parent().parent().remove();}
                    });
                    var search_bar = $('<input />', {
                        type: "text",
                        name: "search",
                        class: "search_bar"
                    });
                    var search_button = $('<button />', {
                        class: "search_button",
                        text: "&#128269;"
                    });

                    section_1.append(close_button);
                    section_1.append(search_bar);
                    //section_2.append(search_button);
                timeline_element.append(section_1);
                timeline_element.append(section_2);
        timeline_element_container.append(timeline_element);
        $(".t_inject_container").append(timeline_element_container);
    }
    
    function minimize_t_inject_container(){
        $(".add_button").toggle();
    }
    
    function create_twitter_bar(){
        var table_container = $("<ul />", {
            class: "t_inject_container"
        });
            var row = $("<li />", { class: "t_inject_row" });
                var menu = $("<ul />", { class: "menu" });
                    var section_1 = $("<li />");
                    var section_2 = $("<li />");
                        var add_element_button = $("<button />", {
                            text: '+',
                            click: add_timeline_element,
                            class: "add_button t_intect_button"
                            
                        });
                        var minimize_button = $("<button />", {
                            text: 'm',
                            click: minimize_t_inject_container,
                            class: "minimize_button t_intect_button"
                        });
                    section_1.append(add_element_button);
                    section_2.append(minimize_button);
                menu.append(section_1);
                menu.append(section_2);
            row.append(menu);
            table_container.append(row);
        $('body').append(table_container);
    }
    create_twitter_bar();
    
    
    
    var scroll_point = 0;
    var done_scrolling;
    var counting = false;
    var time_counter = 0.00;
    
    var scroll_ending = function () {
        console.log("done scrolling");
        clearInterval(counting);
        counting = false;
        time_counter = 0.00;
    };
    $(document).scroll(function() {
        var new_scroll_point = $(document).scrollTop();
        var scroll_delta = Math.abs(scroll_point - new_scroll_point);
        /*if(scroll_delta < 0){
            scroll_delta = scroll_delta * (-1);
        }*/
        scroll_point = new_scroll_point;
        if(counting===false){
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

/*//$(".add_button").click(add_timeline_element);
    
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
    */