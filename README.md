# Input Search with Selection List (like Facebook)
A simple script that works with <a target="_blank" href="https://mootools.net">MooTools</a> 1.6 or more.

## Basic Usage
#### Client side

```javascript
//1 Create main div
var div=$$('.div-box');

//2 Create Elements Object
var divInp = new Element('div.input_search')
    .adopt(
        new Element('input',{type:'text','name':'input_search','placeholder':'Search...',
            //Create event click for on List Result
            events:{
                click:function(){   
            // Call function Input Search of inputsearch.js
            new Functions({url:'index.php?...',objValues:'.div-box .user_list input',searchIn:'name your table MySQL, ecc...'(optional),obj:'.div-box div.input_search',
                onSuccess:function(res){
                    console.log(res); // view result after onClick
                    }
                });
                }
            }
        }),
        new Element('div.result_list')
    );

//3 merge all elements 
div.adopt(divInp,new Element('div.user_list')
.adopt(
    new Element('ul')),
    new Element("div.t_load")
    .adopt(
        new Element("img",{'src':'.../img/load_nav.gif'})
    )
);
```
