;(function ($) {
  var ImageBox = function (option) {
    defaultOption = {
      width: 1000,
      height: 600
    }
    this.option = option?($.extend({},defaultOption,option)):defaultOption;
    var self = this;
    //创建遮罩和容器
    this.mask = $('<div class="imageBox-shadow">');
    this.box = $('<div class="imageBox">');
    //保存body
    this.body = $(document.body);
    this.groupName = null;
    this.groupData = [];
    //渲染剩余DOM并插入body
    this.body.delegate('.thumb-group img','click',function (e) {
      e.stopPropagation();
      
      var index = $(this).index();
      var currentGroup = $(this).attr('data-group');
      if(currentGroup != self.groupName) {
        self.groupName = currentGroup;
        self.getGroupData();
        console.log(self.groupData);
      }
      self.renderDOM();
      self.setDOM();
      $('.prevBtn').click(function () {
        index--;
        if(index<0) {
          index = self.groupData.length-1;
        }
        console.log(1);
        $('.imageView').find('img').attr('src',self.groupData[index].src);
      });
      $('.nextBtn').click(function () {
        index++;
        if(index>self.groupData.length-1) {
          index = 0;
        }
        $('.imageView').find('img').attr('src',self.groupData[index].src);
      });
      $('.imageView').find('img').attr('src',self.groupData[index].src);
    });
    
    this.body.delegate('.close','click',function (e) {
      e.stopPropagation();
      self.closePopup();
    });
    
  }
  ImageBox.prototype = {
    renderDOM: function () {
      var strDOM =  
                    '<div class="imageView">'+
                      '<span class="prevBtn"></span>'+
                      '<img src="./img/1-1.jpg" alt="" />'+
                      '<span class="nextBtn"></span>'+
                      '<div class="close"></div>'+
                    '</div>';
      //插入到容器
      this.box.html(strDOM);
      //把遮罩和容器插入到body
      this.body.append(this.mask,this.box);
    },
    setDOM: function () {
      if(this.option.width) {
        $('.imageView').find('img').css('width', this.option.width+'px');
        $('.imageBox').css({
          'margin-left': -this.option.width/2+'px'
        });
      }
      if(this.option.height) {
        $('.imageView').find('img').css({
          'height': this.option.height+'px'
        });
        $('.imageBox').css({
          'margin-top': -this.option.height/2+'px'
        });
        console.log($('.imageView').find('img').css('height'));
        console.log($('.imageView').find('img').css('width'));
        var width = $('.imageView img').width();
        console.log(width);
      }
    },
    getGroupData: function () {
      var self =this;
      this.groupData.length = 0;
      var groupList = this.body.find('img[data-group='+this.groupName+']');
      console.log(groupList);
      console.log(groupList[0]);
      groupList.each(function () {
        self.groupData.push({
          src: $(this).attr('data-source')
        });
      });
    },
    closePopup: function () {
      this.mask.remove();
      this.box.remove();
    }
  }
  window.ImageBox =ImageBox;
})(jQuery);
