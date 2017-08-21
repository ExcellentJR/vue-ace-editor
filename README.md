# vue-ace-editor
a vue1.x ace-editor component
## How to Use？
1.Install
  ```
  npm install vue-aceeditor
  ```
2.Require it in components of Vue options
  ```
  {
      components: {
          aceeditor:require('vue-aceeditor'),
      },
      data,
      methods,
      ...
  }
  ```
3.Require the editor's mode/theme module in options's events vue-aceeditor:init
  You can choose the language and the theme what you need form the brace mode and theme 
  这是很重要的一步：涉及到编辑器语言模块和编辑器主题，如果需要编辑不同语言则根据注释选择
  ```
  {
    components,
    data,
    methods,
    events:{
        'vue-aceeditor:init':function () {
            require('brace/mode/sql');//选择编辑器语言，eg：'brace/mode/python'
            require('brace/theme/chrome');//选择编辑器主题，eg：'brace/theme/tomorrow'
            require('brace/snippets/sql');//此处根据编辑器语言来选择，两者同步
            require('brace/ext/language_tools');
        }
    },
  }
  ```
4.Use the component in template
  ```
  <aceeditor :style.sync="style" config="config"></aceeditor>
  ```
  ```
  data(){
    return {
      style: {
        height: '300px',
        width: '100%'
      },
      config: {
        language: 'sql',                  //the language you want use in the editor,default sql（编辑器语言，默认sql，可在第3步mode中自己选择）
        theme: 'chrome',                  //the editor's theme,default chrome（编辑器主题，默认chrome）
        fontsize: 16,                     //the editor's font-size,default 16（编辑器字体大小，默认16）
        enableBasicAutocompletion: true,  //if use the basic autocompletion（是否自动补全语法基本的提示）
        enableSnippets: true,             //if use the snippets autocompletion（是否自动补全预发snippets的提示）
        enableLiveAutocompletion: true,   //if use the live autocompletion which you can add by yourself（是否自动补全自己添加的提示）
        wrapLimitRange1: null,            //wrap limit,numer（换行字数1）
        wrapLimitRange2: null,            //wrap limit,numer（换行字数2）
        isWrap: true,                     //if wrap（是否换行）
        isShowPrintMargin: false,         //if show the vertical line （是否显示竖线）
        placeholder: 'Insert Code Here！' //words when the editor's content is empty（编辑器内容为空时的提示）
      }
    }
  }
  ```
