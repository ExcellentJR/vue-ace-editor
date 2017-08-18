var ace = require('brace');
module.exports = {
    template:"<pre :style="style"></pre>",
    props:{
        value:{
            type:String,
            required:true
        },
        style: {
          type: Object,
          default:{
            width: '100%',
            height: '300px',
            position: 'absolute'
          }
        },
        config: {
          type: Object,
          default: function(){
            return {
              language: 'sql',
              theme: 'chrome',
              fontsize: 16,
              enableBasicAutocompletion: true,
              enableSnippets: true,
              enableLiveAutocompletion: true,
              wrapLimitRange1: null,
              wrapLimitRange2: null,
              isWrap: true,
              isShowPrintMargin: false,
              placeholder: 'Insert Code Here！'
            }
          }
        }
    },
    data () {
        return {
            editor:null,
            editContent:""
        }
    },
    methods: {
      setConfig(){
        var _this = this;
        _this.editor.$blockScrolling = Infinity;
        _this.editor.setFontSize(_this.config.fontsize); //设置编辑器里字体的大小，貌似这个可以在外面加CSS样式，但是我试了不行，所以这样写
        _this.editor.session.setMode("ace/mode/" + _this.config.language); //设置代码补全和提示的语法为python，这个需要为不同的语言写不同的模块，不然没有提示功能
        _this.editor.setOptions({ //这个到大括号结束是说设置编辑器是否自动补全，是否自动提示等
            enableBasicAutocompletion: _this.config.enableBasicAutocompletion,
            enableSnippets: _this.config.enableSnippets,
            enableLiveAutocompletion: _this.config.enableLiveAutocompletion
        });
        _this.editor.setTheme("ace/theme/" + _this.config.theme); //设置主题为chrome
        //设置编辑器自动换行
        _this.editor.getSession().setWrapLimitRange(_this.config.wrapLimitRange1, _this.config.wrapLimitRange2);
        _this.editor.getSession().setUseWrapMode(_this.config.isWrap);
        //是否显示垂直衬线
        _this.editor.renderer.setShowPrintMargin(_this.config.isShowPrintMargin);
        //设置编辑器为空时的提示
        _this.editor.on("input", function() {
        _this.update(_this.config.placeholder)
        });
        setTimeout(function() {
            _this.update(_this.config.placeholder)
        }, 100);
      },
      update(str){
        var _this = this,
            shouldShow = !_this.editor.session.getValue().length,
            node = _this.editor.renderer.emptyMessageNode;
        if (!shouldShow && node) {
            _this.editor.renderer.scroller.removeChild(_this.editor.renderer.emptyMessageNode);
            _this.editor.renderer.emptyMessageNode = null;
        } else if (shouldShow && !node) {
            node = _this.editor.renderer.emptyMessageNode = document.createElement("div");
            node.textContent = str;
            node.className = "ace_invisible ace_emptyMessage";
            node.style.padding = "0 9px";
            _this.editor.renderer.scroller.appendChild(node);
        }
      }
    },
    watch:{
        value:function (val) {
            if(this.editContent !== val)
                this.editor.setValue(val,1);
        }
    },
    ready() {
        var _this = this,
            lang = _this.config.lang || 'sql',
            theme = _this.config.theme||'chrome';
        editor = _this.editor = ace.edit(_this.$el);
            
        _this.$emit('init',editor);
        
        _this.setConfig();
        
        editor.setValue(this.value,1);

        editor.on('change',function () {
            var content = editor.getValue();
            _this.$emit('input',content);
            _this.editContent = content;
        });


    }
}
