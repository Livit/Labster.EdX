define(["js/views/baseview", "underscore", "codemirror", "js/views/feedback_notification", "js/views/course_info_helper", "js/utils/modal", "jquery.tinymce"],
    function(BaseView, _, CodeMirror, NotificationView, CourseInfoHelper, ModalUtils) {

    // the handouts view is dumb right now; it needs tied to a model and all that jazz
    var CourseInfoHandoutsView = BaseView.extend({
        // collection is CourseUpdateCollection
        events: {
            "click .save-button" : "onSave",
            "click .cancel-button" : "onCancel",
            "click .edit-button" : "onEdit"
        },

        initialize: function() {
            this.template = _.template($("#course_info_handouts-tpl").text());
            var self = this;
            this.model.fetch({
                complete: function() {
                    self.render();
                },
                reset: true
            });
        },

        render: function () {
            CourseInfoHelper.changeContentToPreview(
                this.model, 'data', this.options['base_asset_url']);

            this.$el.html(
                $(this.template({
                    model: this.model
                }))
            );
            $('.handouts-content').html(this.model.get('data'));
            this.$preview = this.$el.find('.handouts-content');
            this.$form = this.$el.find(".edit-handouts-form");
            this.$editor = this.$form.find('.handouts-content-editor');
            this.$form.hide();

            return this;
        },

        onEdit: function(event) {
            var self = this;
            this.$editor.val(this.$preview.html());
            this.$form.show();

            this.$tinymce = null;
            var that = this;
            this.$editor.tinymce({
                theme: "modern",
                plugins: [
                    "image autolink link"
                ],
                image_dimensions: false,
                image_description: false,
                menubar : false,
                toolbar: "formatselect bold italic underline strikethrough bullist numlist blockquote link unlink image",
                block_formats: "Paragraph=p;Preformatted=pre;Header 1=h1;Header 2=h2;Header 3=h3",
                setup: function(ed) {
                    that.$tinymce = ed;
                }
            });

            // this.$codeMirror = CourseInfoHelper.editWithCodeMirror(
            //     self.model, 'data', self.options['base_asset_url'], this.$editor.get(0));

            ModalUtils.showModalCover(false, function() { self.closeEditor() });
        },

        onSave: function(event) {
            $('#handout_error').removeClass('is-shown');
            $('.save-button').removeClass('is-disabled');
            if ($('.CodeMirror-lines').find('.cm-error').length == 0){
                // this.model.set('data', this.$codeMirror.getValue());

                this.model.set('data', this.$tinymce.getContent());
                var saving = new NotificationView.Mini({
                    title: gettext('Saving&hellip;')
                });
                saving.show();
                this.model.save({}, {
                    success: function() {
                        saving.hide();
                    }
                });
                this.render();
                this.$form.hide();
                this.closeEditor();

                analytics.track('Saved Course Handouts', {
                    'course': course_location_analytics
                });
            }else{
                $('#handout_error').addClass('is-shown');
                $('.save-button').addClass('is-disabled');
                event.preventDefault();
            }
        },

        onCancel: function(event) {
            $('#handout_error').removeClass('is-shown');
            $('.save-button').removeClass('is-disabled');
            this.$form.hide();
            this.closeEditor();
        },

        closeEditor: function() {
            $('#handout_error').removeClass('is-shown');
            $('.save-button').removeClass('is-disabled');
            this.$form.hide();
            ModalUtils.hideModalCover();
            this.$form.find('.CodeMirror').remove();
            this.$codeMirror = null;
        }
    });

    return CourseInfoHandoutsView;
}); // end define()
