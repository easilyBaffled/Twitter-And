/*jshint -W117 */
$(function() {
    var twitterurl = 'http://twitter-and.herokuapp.com/';

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
        $(".app_container_T").toggle();
    }

    function generate_content(){
        var content_list = $('<ul />', {
            class: "content_list_T"
        });
            $.getJSON(twitterurl+'get_timeline', function(data){
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
                
                $.each(data, function(element){
                    var content_element = $('<li />', {
                        class: 't_content',
                        id: 't_id_'+data[element]['id_str'],
                        onclick: tweet_info(data[element]['id_str']),

                    });
                    var t_element_picture = $('<img />', {
                        class: 't_content_container_image',
                        src: data[element]['user']['profile_image_url'],
                    });
                    var t_element_text = $('<p />', {
                        class: 't_content_container_text',
                        text: data[element]['text'],
                    });
                    content_element.append(t_element_picture);
                    content_element.append(t_element_text);
                    content_list.append(content_element);

                });
            });
        return content_list;
    }

    function tweet_info(id){
        $(".content_list").removeClass('t_content');
    }

    function add_t_content(){
        var container_element = $("#"+this.id);
        var container_children = container_element.children();
        var content_header = $(container_children[1]);
        var content_container = $(container_children[2]);
        content_header.empty();
            var close_button = generate_close_button();
            var content_title = $("<button />", {
                                text: this.value,
                                id: container_id,
                                click: swap_title_and_question,
                                class: "content_title_T"
                            });
        content_container.empty();
            var content = generate_content();
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
                    var relevent_selector = generate_content_selector('Relevent', container_id);
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
                        text: '-',
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
                    var word_count = $("<textarea />", {
                        class: "tweet_word_count_T"
                    });
                    var undo_toggle = $("<button />", {
                        value: "Undo: Off",
                        class: "composition_button_T Undo_button_T"
                    });
                    var send_tweet_button = $("<button />", {
                        value: "Send",
                        class: "composition_button_T send_button_T"
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
        menu.append(options_button);
        table_container.append(menu);
        resize_container.append(table_container);

        var minimize_button = $("<button />", {
            text: 'm',
            click: minimize_app,
            class: "small_menu_button_T minimize_button"
        });


        resize_container.append(table_container);
        $('body').append(resize_container);
        $('body').append(minimize_button);
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
                $(".app_container_T").hide();
            }
        }
    });
});
