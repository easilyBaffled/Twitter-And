/*jshint -W117 */
$(function() {
    function get_data(url){
        var arr = url.match(/(http|https):\/\/(\w+).\w+\/(\w?)/);
        var searchurl = 'http://127.0.0.1:8000/search_twitter?q='+arr[2];
        var data = [];

        $.getJSON(searchurl, function(data) {
            $.each(data, function(key, value){
                if (key=='statuses'){
                    $.each(value, function(k, v){
                        var tweet = {};
                        
                    });
                }
            });
        });
    }
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
        console.log($(this).parent());
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
            class: "content"
        });
            var content_element = $('<li />', {
                class: 't_content',
                text: "content"
            });
        content_list.append(content_element);
        return content_list;
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
                class: 't_container_element',
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
            class: "t_inject_container"
        });
                var row = $("<li />", {
                    class: "t_inject_row"
                });
                    var menu = $("<ul />", {
                        class: "menu"
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

/*
var socket_id = 0;
var JSON_Model = (function() {
        var url = "http://www.kimonolabs.com/api/4r6c7hno?apikey=d753b0c5546495826e7aaa5422f59e30&callback=?";
        var pull_interval = setInterval(pull_new_json_content, 15 * 60 * 1000);
        //SOCKET CALLBACK FUNCTIONS
        var question_sockets = {};
        var user_sockets = {};
        var alternate_site_questions_sockets = {};
        //SAVED CONTENT
        var new_content = {
            questions: ["content 1", "content 2", "content 2"],
            users: [],
            alternate_site_questions: []
        };
        var old_content = {
            questions: [],
            users: [],
            alternate_site_questions: []
        };

        function update_controller() {
            for (var question_callback_id in question_sockets) {
                var question_callback_function = question_sockets[question_callback_id];
                question_callback_function(new_content.questions);
                $.extend(true, old_content.questions, new_content.questions);
                new_content.questions = [];
            }
            for (var user_callback_id in this.user_sockets) {
                var user_callback_function = this.user_sockets[user_callback_id];
                user_callback_function(this.new_content.users);
                $.extend(true, this.old_content.users, this.new_content.users);
                this.new_content.users = [];
            }
            for (var alt_callback_id in this.alternate_site_questions_sockets) {
                var alt_callback_function = this.alternate_site_questions_sockets[alt_callback_id];
                alt_callback_function(this.new_content.alternate_site_questions);
                $.extend(true, this.old_content.alternate_site_questions, this.new_content.alternate_site_questions);
                this.new_content.alternate_site_questions = [];
            }
        }

        function filter_and_store_new_json_content(new_json_content) {
            //ADD PREVIOUS NEW CONTENT TO OLD CONTENT
            if (this.new_content != []) {
                $.extend(true, this.old_content, this.new_content);
                this.new_content = {
                    questions: [],
                    users: [],
                    alternate_site_questions: []
                };
            }
            //GET TO THE ACTUAL NEW CONTENT, AND SEPARATE REGULAR QUESTIONS FROM ALT SITE QUESTIONS
            var json_dict = new_json_content.results;
            var site_question_array = json_dict.Question_Data;
            var alt_site_question_array = json_dict.Alt_Sites;
            //FILITER OUT STUFF THAT WE ALREADY HAVE
            site_question_array = site_question_array.filter(function(elem) {
                return ($.inArray(elem.Question_Title.text, this.old_content.questions)) == -1;
            });
            alt_site_question_array = alt_site_question_array.filter(function(elem) {
                return ($.inArray(elem.Alt_Question_Title.text, this.old_content.questions)) == -1;
            });
            //ADD NEW CONTENT TO STRUCTURES
            for (var question_content in site_question_array) {
                this.new_content.questions.push(question_content.Question_Title.text);
                this.new_content.users.push(question_content.Question_User.text);
            }
            for (var alt_question_content in alt_site_question_array) {
                this.new_content.alternate_site_questions.push(data_elem.Alt_Question_Title.text);
                this.new_content.users.push(alt_question_content.Question_User.text);
            }
            update_controller();
        }

        function pull_new_json_content() {
            $.getJSON(this.url, this.filter_and_store_new_json_content);
        }
        return {
            create_socket_for_questions: function(id, controller_callback) {
                question_sockets[id] = controller_callback;
                update_controller();
            },
            create_socket_for_users: function(id, controller_callback) {
                this.user_socket[id] = controller_callback;
                this.update_controller();
            },
            create_socket_for_alt_sites_questions: function(id, controller_callback) {
                this.alternate_site_questions_sockets[id] = controller_callback;
                this.update_controller();
            },
            remove_socket_for_questions: function(id) {
                this.question_socket.delete(id);
            },
            remove_socket_for_users: function(id) {
                this.user_socket.delete(id);
            },
            remove_socket_for_alt_sites_questions: function(id) {
                this.alternate_site_questions_sockets.delete(id);
            }
        };
    })();

    /*defunct function add_timeline_element() {
        title = this.className;
        $(".selection_container").parent().remove();
        var element_id = ++socket_id;
        var timeline_element_container = $('<li />');
            var timeline_element = $('<ul />', {
                class: "content_container",
            });
                var section_1 = $("<li />");
                    var close_button = $('<button />', {
                        text: '-',
                        class: "t_intect_button close_button",
                        click: function() {
                            $(this).parent().parent().parent().remove();
                        }
                    });
                    var content_title = $("<button />", {
                                    text: title,
                                    click: swap_title_and_question,
                                    class: "content_selection_button"
                                });
                var section_2 = $("<li />");
                    var content = $('<ul />', {
                        class: "pulled_content_container",
                        id: element_id
                    });

                        
                    section_1.append(close_button);
                    section_1.append(content_title);
                    section_2.append(new_content_button);
                    section_2.append(content);
                timeline_element.append(section_1);
                timeline_element.append(section_2);
            timeline_element_container.append(timeline_element);
        $(".t_inject_container").append(timeline_element_container);
        var pulled_question_content =
                            JSON_Model.create_socket_for_questions(element_id,
                                function(new_content) {
                                    for (var content_index in new_content) {
                                        var list_elem = $('<li />', {
                                            class: "pulled_content",
                                            text: new_content[content_index]
                                        });
                                    }
                                });
    }*/
