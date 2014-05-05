/*jshint -W117 */
$(function() {
    var twitterurl = 'http://twitter-and.herokuapp.com/';
    //var twitterurl = 'http://127.0.0.1:8000/';
    function generate_search_form(container_id){
         var search_form = $("<form />", {
                        name: "search_form",
                        class: "search_form_T"
                    });
                        var search_input = $("<input />", {
                            type: "text",
                            name: "search_input",
                            class: "search_bar_T"
                        });
                        var search_button = $("<button />", {
                            class: "search_button_T icon-zoom-outline",
                            name: "search_button",
                            click:  add_t_content
                        });
            search_form.append(search_input);
            search_form.append(search_button);
            return search_form;
    }

    function swap_title_and_question(){
        var current_parent = $(this).parent();
        $(this).remove();
        var search_form = generate_search_form();
        current_parent.append(search_form);
    }

    function minimize_app() {
        if($(".ticker_bar_T").hasClass("ticker_bar_visiable_T")){
            $(".ticker_bar_T").toggleClass("ticker_bar_visiable_T");
        }
        $(".app_container_T").toggleClass("app_container_visiable_T");
    }

    function toggle_ticker() {
        var s = "";

        $.getJSON(twitterurl+'get_timeline', function(data){
            tweets = data['statuses'];
            $.each(tweets, function(element){
                s+='@'+tweets[element]['user']['screen_name']+'-';
                s+=tweets[element]['text']+'      &&      ';
            });
            $(".ticker_bar_T").append(s);
        });

        if($(".app_container_T").hasClass("app_container_visiable_T")){
            $(".app_container_T").toggleClass("app_container_visiable_T");
        }
        $(".ticker_bar_T").toggleClass("ticker_bar_visiable_T");
    }

    function generate_content(title){
        var content_list = $('<ul />', {
            class: "content_list_T"
        });

        var url = '';
        if (title == 'Relevant'){
            url = twitterurl + 'search_twitter?q=' + location.href;
            console.log(url);
        }else if (title == 'Timeline'){
            url = twitterurl + 'get_timeline';
            console.log(url);
        }else if (title == 'Mentions'){
            url = twitterurl + 'mentions';
        }else{
            console.log("error"+title);
        }

            $.getJSON(url, function(data){
                if (data['loggedin'] == 'false'){
                    var notloggedin = $('<li />', {
                        class: 't_content',
                    });
                    var oops = $('<p />', {
                        class: 't_content_container_text',
                        text: 'Not logged in. Go to '+twitterurl+'login',
                    });
                    notloggedin.append(oops);
                    content_list.append(notloggedin);
                    return content_list;
                }
                if (data['aretheretweets'] == 'false'){
                    console.log("No tweets");
                    return content_list; //NEED TO FIX
                }

                tweets = data['statuses'];
                
                $.each(tweets, function(element){
                    
                    var now = new Date();
                    var date = new Date(tweets[element]['created_at']);
                    var difference = (Math.round((now-date)/1000)/60);
                    var time = 0;
                    var hours = false;
                    var days = false;
                    if (difference > 60){
                        time = Math.round(difference/60);
                        if (time > 23){
                            time = Math.round(time/24);
                            days = true;
                        }
                        hours = true;
                    }else{
                        time = Math.round(difference);
                    }

                    var content_element = $('<li />', {
                        class: 't_content',
                        id: 't_id_'+tweets[element]['id_str'],
                        onclick: tweet_info(tweets[element]['id_str']),
                    });
                    var t_element_picture = $('<img />', {
                        class: 't_content_container_image',
                        src: tweets[element]['user']['profile_image_url'],
                    });
                    var t_element_text = $('<span />', {
                        class: 't_content_container_text',
                        text: tweets[element]['text']
                    });

                    var date_posted;

                    if (hours){
                        if (days){
                            date_posted = $('<span />', {
                                class: 'date_posted_T',
                                text: time + ' d'
                            });
                        }else{
                            date_posted = $('<span />', {
                                class: 'date_posted_T',
                                text: time + ' h'
                            });
                        }
                    }else{
                        date_posted = $('<span />', {
                        class: 'date_posted_T',
                        text: time + ' m'
                    });
                    }

                    
                    var post_account_handle = $('<span />', {
                        class: 'post_account_name',
                        text: tweets[element]['user']['name'] + ' @'+tweets[element]['user']['screen_name']
                    });
                    
                    var tweet_options_bar = $('<span />', {
                        class: 'options_bar options_bar_hidden',
                    });
                        var reply_button = $("<button />", {
                            class: "tweet_options_button icon-arrow-back-outline",
                            text: "Reply"
                        });
                        var retweet_button = $("<button />", {
                            class: "tweet_options_button icon-arrow-repeat-outline",
                            text: "Retweet",
                            click: function(){
                                var data = {'id': tweets[element]['id'], 'type': 'retweet'};
                                var cleandata = JSON.stringify(data);
                                console.log(cleandata);
                                $.ajax({
                                    url: twitterurl+'retweet/',
                                    type: 'POST',
                                    contentType: 'application/json; charset=uft-8',
                                    data: cleandata,
                                    async: false,
                                    crossDomain: false,
                                    success: function(){
                                        alert('Retweet Complete!');
                                    },
                                    error: function(){
                                        alert("There was an error");
                                    }
                                });
                            }
                        });
                        var favorite_button = $("<button />", {
                            class: "tweet_options_button icon-star-outline",
                            text: "Favorite",
                            click: function(){
                                var data = {'id': tweets[element]['id'], 'type': 'favorite'};
                                var cleandata = JSON.stringify(data);
                                console.log(cleandata);
                                $.ajax({
                                    url: twitterurl+'retweet/',
                                    type: 'POST',
                                    contentType: 'application/json; charset=uft-8',
                                    data: cleandata,
                                    async: false,
                                    crossDomain: false,
                                    success: function(){
                                        alert('Favorite Complete!');
                                    },
                                    error: function(){
                                        alert("There was an error");
                                    }
                                });
                            }
                        });
                    content_element.append(t_element_picture);
                    content_element.append(t_element_text);
                    content_element.append(date_posted);
                    content_element.append(post_account_handle);
                    tweet_options_bar.append(reply_button);
                    tweet_options_bar.append(retweet_button);
                    tweet_options_bar.append(favorite_button);
                    content_element.append(tweet_options_bar);
                    content_list.append(content_element);


                });
            });
        return content_list;
    }

    function tweet_info(id){
        $(".content_list").removeClass('t_content');
    }

    function add_t_content(){
        var title = this.innerText;
        var container_element = $("#"+this.id);
        var container_children = container_element.children();
        var content_header = $(container_children[1]);
        var content_container = $(container_children[2]);
        content_header.empty();
            var close_button = generate_close_button(container_id);
            var content_title = $("<button />", {
                                text: this.value,
                                id: container_id,
                                click: swap_title_and_question,
                                class: "content_title_T"
                            });
        content_container.empty();
        var content = generate_content(title);
        content_header.append(close_button);
        content_header.append(content_title);
        content_container.append(content);
    }

    function generate_content_selector(title, container_id){
        var add_content_selector = $("<button />", {
                                    text: title,
                                    value: title,
                                    id: container_id,
                                    click: add_t_content,
                                    class: "content_selection_button_T"
                                });
        return add_content_selector;
    }

    var container_id = 0;
    function generate_container_element(){
            var t_container_element = $('<ul>', {
                class: 'container_element_T t_ul',
                id: ++container_id
            });
             t_container_element.resizable({ handles: "e" });
                var content_header = $('<li />', { class: 'content_header_T' });
                    var close_button = generate_close_button(container_id);
                    var search_form = generate_search_form(container_id);
                var content_container = $('<li />', { class: 'content_container_T' });
                    var timeline_selector = generate_content_selector('Timeline', container_id);
                    var relevent_selector = generate_content_selector('Relevant', container_id);
                    var mention_selector = generate_content_selector('Mentions', container_id);
                content_header.append(close_button);
                content_header.append(search_form);
            t_container_element.append(content_header);
                content_container.append(timeline_selector);
                content_container.append(relevent_selector);
                content_container.append(mention_selector);
            t_container_element.append(content_container);
        return t_container_element;
    }

   function add_content_selection_element(){
        var container_list_element = generate_container_element();
        $(".app_container_T").append(container_list_element);
    }

    function generate_close_button(container_id){
        var close_button = $('<button />', {
                        text: 'x',
                        class: "t_intect_button close_button_T",
                        click: function() {
                                    $("#" + container_id).remove();
                                  }
                        });
        return close_button;
    }

    function compose_tweet(){
        var container_list_element = $("<ul />", {
                    class: "container_element_T t_ul",
                    id: ++container_id
                });
        container_list_element.resizable({ handles: "e" });
                var text_container= $('<li />', { class: 'text_container_T' });
                    var close_button = generate_close_button(container_id);
                    var textarea = $("<textarea />", {
                        class: "tweet_text_area_T",
                        warp: "hard",
                        placeholder: "Compose new Tweet"
                    });
                var button_container = $('<li />', { class: 'button_container_T' });
                    var add_photo_button = $("<button />", {
                        value: "Add Photo",
                        class: "composition_button_T icon-camera-outline"
                    });
                    var add_location_button = $("<button />",{
                        value: "Add Location",
                        class: "composition_button_T icon-location-outline"
                    });
                    var word_count = $("<button />", {
                        class: "composition_button_T",
                        id: "word_count_button_T",
                    });
                    var undo_toggle = $("<button />", {
                        value: "Undo: Off",
                        class: "composition_button_T Undo_button_T"
                    });
                    var send_tweet_button = $("<button />", {
                        text: "Send",
                        class: "composition_button_T send_button_T",
                        click: function() {
                            var data = {'text': $('.tweet_text_area_T').val()};
                            var cleandata = JSON.stringify(data);

                            if ($('.tweet_text_area_T').val().length <= 140){
                                $.ajax({
                                    url: twitterurl+'send_tweet/',
                                    type: 'POST',
                                    contentType: 'application/json; charset=uft-8',
                                    data: cleandata,
                                    async: false,
                                    crossDomain: false,
                                    success: function(){
                                        alert('Tweet Sent!');
                                        $("#" + container_id).remove();
                                    },
                                    error: function(){
                                        alert("There was an error");
                                    }
                                });
                            }else{
                                alert("Too many characters! Cannot send tweet.");
                            }
                            return false;
                        },
                    });
                text_container.append(close_button);
                text_container.append(textarea);
                container_list_element.append(text_container);
                button_container.append(add_photo_button);
                button_container.append(add_location_button);
                button_container.append(word_count);
                button_container.append(undo_toggle);
                button_container.append(send_tweet_button);
            container_list_element.append(button_container);
        $(".app_container_T").append(container_list_element);

            var max_char = 140;
            $("#word_count_button_T").html(max_char);

            $(".tweet_text_area_T").keyup(function(){
                var char_count = $(".tweet_text_area_T").val().length;
                var remaining_char = max_char - char_count;
                console.log("TEST");
                $("#word_count_button_T").html(remaining_char);
            });

    }

    function create_twitter_bar() {
        var url = location.href;
        var resize_container = $("<span />", { class: "resize_container" });
        var table_container = $("<span />", { class: "app_container_T" });
        table_container.resizable({ handles: "n" });

        var menu = $("<span />", { class: "menu_T" });
                var add_element_button = $("<button />", {
                    click: add_content_selection_element,
                    class: "large_menu_button_T icon-home-outline"
                });
                var tweet_element_button = $("<button />", {
                    click: compose_tweet,
                    class: "large_menu_button_T icon-pencil"
                });
                var options_button = $("<button />", {
                    class: "small_menu_button_T icon-cog-outline options"
                });

        menu.append(add_element_button);
        menu.append(tweet_element_button);
        //menu.append(options_button);
        table_container.append(menu);
        resize_container.append(table_container);

        var minimize_button = $("<button />", {
            text: '&',
            click: minimize_app,
            class: "small_menu_button_T minimize_button_T"
        });

        var ticker_button = $("<button />", {
            text: '>',
            click: toggle_ticker,
            class: "small_menu_button_T ticker_button_T"
        });



        var ticker_bar= $("<marquee/>", {
            direction: "left",
            loop: "5",
            scrollamount: "5",
            mouseover: function(){this.stop();},
            mouseout: function(){this.start();},
            class: "ticker_bar_T"
        });


        resize_container.append(table_container);
        $('body').append(resize_container);
        $('body').append(minimize_button);
        $('body').append(ticker_button);
        $("body").append(ticker_bar);
        
    }



    create_twitter_bar();

    var scroll_point = 0;
    var done_scrolling;
    var counting = false;
    var time_counter = 0.00;

    var scroll_ending = function() {
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
        if (counting === false) {
            counting = setInterval(function() {
                time_counter += 0.1;
            }, 100);
        } else {
            var scroll_over_time = scroll_delta / time_counter;
            clearTimeout(done_scrolling);
            done_scrolling = setTimeout(scroll_ending, 150);
            if (scroll_over_time > 400 && scroll_over_time < 3000) {
                if($(".app_container_T").hasClass("app_container_visiable_T")){
                    $(".app_container_T").toggleClass("app_container_visiable_T");
                }
            }
        }
    });
});