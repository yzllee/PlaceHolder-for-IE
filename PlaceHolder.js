var PlaceHolder = {
    //检测
    _check: function () {
        return 'placeholder' in document.createElement('input');
    },
    //初始化
    init: function () {
        if (!this._check()) {
            this.fix();
        }
    },
    //修复
    fix: function () {
        jQuery(':input[placeholder]').each(function (index, element) {
            var self = $(this), txt = self.attr('placeholder');
            self.wrap($('<div></div>').css({ position: 'relative', zoom: '1', border: 'none', background: 'none', padding: 'none', margin: 'none' }));
            var pos = self.position(), h = self.outerHeight(true) + 'px', 
            marginleft = parseInt(self.css('margin-left').slice(0, -2));
            var holder = $('<span></span>').text(txt).css({ 
                position: 'absolute', 
                zIndex: '999', 
                height: h, 
                lineHeight: h, 
                left: pos.left + marginleft, 
                top: pos.top, 
                color: '#aaa' 
            }).appendTo(self.parent());
            self.focusin(function (e) {
                holder.hide();
            }).focusout(function (e) {
                if (!self.val()) {
                    holder.show();
                }
            });
            holder.click(function (e) {
                holder.hide();
                self.focus();
            });
        });
    }
};
//执行
jQuery(function () {
    PlaceHolder.init();
});