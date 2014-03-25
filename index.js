/*jshint -W117 */
$(function() {
    var twitterurl = 'http://twitter-and.herokuapp.com/';

    function generate_search_form(container_id){
         var search_form = $("<form />", {
                        name: "search_form",
                        class: "search_form"
                    });
                        var search_input = $("<input />", {
                            type: "text",
                            name: "search_input",
                            class: "search_bar"
                        });
                        var search_button = $('<button'
                            + ' class="search_button"'
                            + ' name="search_button"'
                            +   'onClick ="add_timeline_element"'
                            +' > &#128269; </button>'
                          );
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

    

    function minimize_t_inject_container() {
        $(".large_menu_button").toggle();
    }

    function generate_content(){
        var content_list = $('<ul />', {
            class: "content_list"
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
        var container_element = $('#'+this.id);
        var container_children = container_element.children();
        var content_header = $(container_children[0]);
        var content_container = $(container_children[1]);

        content_header.empty();
            var close_button = $('<button />', {
                        text: '-',
                        class: "t_intect_button close_button",
                        click: function() {
                                    container_element.parent().remove();
                                  }
                        });
            var content_title = $("<button />", {
                                text: this.value,
                                id: container_id,
                                click: swap_title_and_question,
                                class: "content_title"
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
                                    class: "content_selection_button"
                                });
        return add_content_selector;
    }

    var container_id = 0;
    function generate_container_element(){
        var container_list_element = $('<li />');
            var t_container_element = $('<ul>', {
                class: 't_container_element t_ul',
                id: ++container_id
                });
                var content_header = $('<li />', {
                   class: 'content_header'
                   });
                    var close_button = $('<button />', {
                        text: '-',
                        class: "t_intect_button close_button",
                        click: function() {
                                    container_list_element.remove();
                                  }
                        });
                    var search_form = generate_search_form(container_id);
                var content_container = $('<li />', {
                   class: 'content_container'
                   });
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
                container_list_element.append(t_container_element);
        return container_list_element;
    }

   function add_content_selection_element(){
        var container_list_element = generate_container_element();
        $(".t_inject_container").append(container_list_element);
    }

    function compose_tweet(){
        var container_list_element = $("<li />", {
            class: "tweet_container"
        });
                var close_button = $('<button />', {
                        text: '-',
                        class: "t_intect_button close_button",
                        click: function() {
                                    container_list_element.remove();
                                  }
                        });
                var textarea = $("<textarea />", {
                    class: "tweet_text_area",
                    warp: "hard",
                    placeholder: "Compose new Tweet"
                });
                var add_photo_button = $("<button />", {
                    value: "Add Photo",
                    class: "composition_button photo_button"
                });
                var add_location_button = $("<button />",{
                    value: "Add Location",
                    class: "composition_button location_button"
                });
                var word_count = $("<textarea />", {
                    class: "tweet_word_count"
                });
                var undo_toggle = $("<button />", {
                    value: "Undo: Off",
                    class: "composition_button Undo_button"
                });
                var send_tweet_button = $("<button />", {
                    value: "Send Tweet",
                    class: "composition_button send_button"
                });
            container_list_element.append(close_button);
            container_list_element.append(textarea);
            container_list_element.append(add_photo_button);
            container_list_element.append(add_location_button);
            container_list_element.append(word_count);
            container_list_element.append(undo_toggle);
            container_list_element.append(send_tweet_button);
            $(".t_inject_container").append(container_list_element);


    }

    function create_twitter_bar() {
        var url = location.href;
        var table_container = $("<ul />", {
            class: "t_inject_container t_ul"
        });
                var row = $("<li />", {
                    class: "t_inject_row"
                });
                    var menu = $("<ul />", {
                        class: "menu t_ul"
                    });
                        var section_1 = $("<li />");
                            var add_element_button = $("<button />", {
                                text: '+',
                                click: add_content_selection_element,
                                class: "large_menu_button"
                            });
                            var tweet_element_button = $("<button />", {
                                text: 'T',
                                click: compose_tweet,
                                class: "large_menu_button"
                            });
                            var minimize_button = $("<button />", {
                                text: 'm',
                                click: minimize_t_inject_container,
                                class: "small_menu_button"
                            });
                            var options_button = $("<button />", {
                                text: 'o',
                                click: minimize_t_inject_container,
                                class: "small_menu_button"
                            });
                        section_1.append(add_element_button);
                        section_1.append(tweet_element_button);
                        section_1.append(minimize_button);
                        section_1.append(options_button);
                    menu.append(section_1);
                row.append(menu);
            table_container.append(row);
        $('body').append(table_container);
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
                $(".add_button").hide();
            }
        }
    });
});
