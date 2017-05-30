/**
	* Require Mootools  >= 'mootools-core-1.6.0.js' && 'MooTools-More-1.6.0.js'
	*Copyright(c) 2015 Antonino Di Natale gyorgio88@gmail.com
	*
	*Version 1.0
*/

var Functions=new Class({
	Implements: [Chain, Events, Options],
	options:{
		url:'',				//Index.php?view=...
		searchIn:'',	//table
		obj:'',				//Element
		objValues:''	//Element return values		
		},
	
	initialize: function(options){
		this.setOptions(options);
		this.scrollList(this.options.obj);
	},
	ajax:function(url,loader,res,mt,res2,mt2,res3){
			var self=this;
			var ax=new Request({url:url,method:'post',onSuccess:function(result){$$(loader).cloak();
				if(res){
					$$(res).appendHTML(result,'before');
				}else if(res2){$$(res2).set('html',result);
				}else if(res3){self.resultList(result,res3);}
				if(mt){eval('MS.'+mt);}else if(mt2){eval(mt2);}},onRequest:function(){$$(loader).show();if(res2){$$(res2).set('html','');}},onFailure: function(){alert("Caricamento AJAX fallito...");}});
			return ax;
	},
	resultList:function(result,el){
		var rt='',self=this;	
		if(result.length > 0){
			rt=new Element('ul');
			JSON.decode(result).each(function(val){
				var pcr=(val.picture)? val.picture:'template/img/msg/user.gif';
				var div="<div class='user_img'><img src='"+pcr+"'></div><span>"+val.nome+"</span>",
				li=new Element('li',{'role':'option',
					'id':val.id,
					'title':val.nome,
				'aria-lable':val.nome}).set('html',div).addEvent('click',function(event){event.preventDefault();self.success(this,el);});
				rt.adopt(li);
			});			
		}	
		$$(el).set('html','').adopt(rt);
		var li=$$(el).getElement('li');
		(li.toString().length > 0)? li[0].addClass('selected'):'';
	},
	scrollList:function(el){
		var el=$$(el),
		input=el.getElement('input'),
		resList=el.getElement('.result_list'),
		liSelected,self=this;
		
		input.addEvent('keyup',function(event){
			event.preventDefault();
			if(event.code!==13 && event.code!==38 && event.code!==40){
				var txt=this.get('value');
				var rtnValues=JSON.encode($$(self.options.objValues).get('value'));
				if(txt.trim().length > 0){
					self.ajax(self.options.url,null,null,null,null,null,resList).send('in='+self.options.searchIn+'&key='+txt+'&rtnvalues='+rtnValues);
				}else{resList.set('html','')}
			}
		}).addEvent('keydown',function(event){
			//navigate User with arrow
			if(event.code===13 || event.code===38 || event.code===40){
				var liUs=resList;
				liSelected=liUs.getElement('li.selected');		
				if(event.code === 40 && liUs.getElement('li').toString().length > 0){						
					liSelected.removeClass('selected');						 
					if(liSelected.getNext().toString().length >0){
						liSelected=liSelected.getNext().addClass('selected');
					}else{
						liSelected=liUs.getElements('li')[0][0].addClass('selected');
					}  							
				}else if(event.code === 38 && liUs.getElement('li').toString().length > 0){
					liSelected.removeClass('selected');  						   						  					
					if(liSelected.getPrevious().toString().length >0){
					liSelected=liSelected.getPrevious().addClass('selected');
					}else{
					liSelected=liUs.getElements('li')[0].getLast().addClass('selected');
					}
				}else if(event.code === 13 && liUs.getElement('li').toString().length > 0){
					self.success(liSelected[0],resList);
				}  						
			}
		}).setFocus();		
	},success: function(res,el){
		el.set('html','').getPrevious().set('value','');
		this.onSuccess(res);
	},onSuccess: function(res){
		this.fireEvent('success', arguments);
	}
});
