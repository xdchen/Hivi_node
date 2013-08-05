require(['jquery', 'ejs'], function ($, ejs) {
    var initCommentForm = function () {
        var form = $('.comment-submit');
        var input = form.find('input[type="text"]');
        var submit = form.find('a.primaryAction');
        var submitUrl = form.data('posturl');
        var submitForm = function (comment) {
            if (!comment)
                return;            

            if (form.data('loading'))
                return;

            form.data('loading', true);

            var success = function (result) {                
                form.prev().append(new ejs({ url: '/templates/comment.ejs' }).render(result));
                form.data('loading', false);
            };

            var error = function () {
                form.data('loading', false);
            };
            
            $.ajax({
                url: submitUrl,
                type: 'POST',
                data: { comment: comment },
                success: success,
                error: error                
            });
        };
        submit.on('click', function () {
            submitForm(input.val());
            return false;
        });
    };

    $(function () {        
        initCommentForm();
    });
});