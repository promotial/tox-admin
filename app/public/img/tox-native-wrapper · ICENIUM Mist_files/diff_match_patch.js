(function(){function a(){this.Diff_Timeout=1;this.Diff_EditCost=4;this.Match_Threshold=0.5;this.Match_Distance=1000;this.Patch_DeleteThreshold=0.5;this.Patch_Margin=4;this.Match_MaxBits=32}a.prototype.diff_main=function(h,i,j,k){"undefined"==typeof k&&(k=0>=this.Diff_Timeout?Number.MAX_VALUE:(new Date).getTime()+1000*this.Diff_Timeout);if(null==h||null==i){throw Error("Null input. (diff_main)")}if(h==i){return h?[[0,h]]:[]}"undefined"==typeof j&&(j=!0);var l=j,m=this.diff_commonPrefix(h,i);j=h.substring(0,m);h=h.substring(m);i=i.substring(m);var m=this.diff_commonSuffix(h,i),n=h.substring(h.length-m);h=h.substring(0,h.length-m);i=i.substring(0,i.length-m);h=this.diff_compute_(h,i,l,k);j&&h.unshift([0,j]);n&&h.push([0,n]);this.diff_cleanupMerge(h);return h};a.prototype.diff_compute_=function(h,i,j,k){if(!h){return[[1,i]]}if(!i){return[[-1,h]]}var l=h.length>i.length?h:i,m=h.length>i.length?i:h,n=l.indexOf(m);return -1!=n?(j=[[1,l.substring(0,n)],[0,m],[1,l.substring(n+m.length)]],h.length>i.length&&(j[0][0]=j[2][0]=-1),j):1==m.length?[[-1,h],[1,i]]:(l=this.diff_halfMatch_(h,i))?(m=l[0],h=l[1],n=l[2],i=l[3],l=l[4],m=this.diff_main(m,n,j,k),j=this.diff_main(h,i,j,k),m.concat([[0,l]],j)):j&&100<h.length&&100<i.length?this.diff_lineMode_(h,i,k):this.diff_bisect_(h,i,k)};a.prototype.diff_lineMode_=function(h,i,j){var k=this.diff_linesToChars_(h,i);h=k.chars1;i=k.chars2;k=k.lineArray;h=this.diff_main(h,i,!1,j);this.diff_charsToLines_(h,k);this.diff_cleanupSemantic(h);h.push([0,""]);for(var l=k=i=0,m="",n="";i<h.length;){switch(h[i][0]){case 1:l++;n+=h[i][1];break;case -1:k++;m+=h[i][1];break;case 0:if(1<=k&&1<=l){h.splice(i-k-l,k+l);i=i-k-l;k=this.diff_main(m,n,!1,j);for(l=k.length-1;0<=l;l--){h.splice(i,0,k[l])}i+=k.length}k=l=0;n=m=""}i++}h.pop();return h};a.prototype.diff_bisect_=function(o,x,y){for(var z=o.length,A=x.length,B=Math.ceil((z+A)/2),C=B,D=2*B,F=Array(D),E=Array(D),G=0;G<D;G++){F[G]=-1,E[G]=-1}F[C+1]=0;E[C+1]=0;for(var G=z-A,L=0!=G%2,M=0,O=0,K=0,R=0,Q=0;Q<B&&!((new Date).getTime()>y);Q++){for(var J=-Q+M;J<=Q-O;J+=2){var H=C+J,I;I=J==-Q||J!=Q&&F[H-1]<F[H+1]?F[H+1]:F[H-1]+1;for(var N=I-J;I<z&&N<A&&o.charAt(I)==x.charAt(N);){I++,N++}F[H]=I;if(I>z){O+=2}else{if(N>A){M+=2}else{if(L&&(H=C+G-J,0<=H&&H<D&&-1!=E[H])){var P=z-E[H];if(I>=P){return this.diff_bisectSplit_(o,x,I,N,y)}}}}}for(J=-Q+K;J<=Q-R;J+=2){H=C+J;P=J==-Q||J!=Q&&E[H-1]<E[H+1]?E[H+1]:E[H-1]+1;for(I=P-J;P<z&&I<A&&o.charAt(z-P-1)==x.charAt(A-I-1);){P++,I++}E[H]=P;if(P>z){R+=2}else{if(I>A){K+=2}else{if(!L&&(H=C+G-J,0<=H&&(H<D&&-1!=F[H])&&(I=F[H],N=C+I-H,P=z-P,I>=P))){return this.diff_bisectSplit_(o,x,I,N,y)}}}}}return[[-1,o],[1,x]]};a.prototype.diff_bisectSplit_=function(h,i,j,k,l){var m=h.substring(0,j),n=i.substring(0,k);h=h.substring(j);i=i.substring(k);m=this.diff_main(m,n,!1,l);l=this.diff_main(h,i,!1,l);return m.concat(l)};a.prototype.diff_linesToChars_=function(h,i){function j(d){for(var e="",o=0,p=-1,q=k.length;p<d.length-1;){p=d.indexOf("\n",o);-1==p&&(p=d.length-1);var s=d.substring(o,p+1),o=p+1;(l.hasOwnProperty?l.hasOwnProperty(s):void 0!==l[s])?e+=String.fromCharCode(l[s]):(e+=String.fromCharCode(q),l[s]=q,k[q++]=s)}return e}var k=[],l={};k[0]="";var m=j(h),n=j(i);return{chars1:m,chars2:n,lineArray:k}};a.prototype.diff_charsToLines_=function(g,h){for(var i=0;i<g.length;i++){for(var j=g[i][1],k=[],l=0;l<j.length;l++){k[l]=h[j.charCodeAt(l)]}g[i][1]=k.join("")}};a.prototype.diff_commonPrefix=function(g,h){if(!g||!h||g.charAt(0)!=h.charAt(0)){return 0}for(var i=0,j=Math.min(g.length,h.length),k=j,l=0;i<k;){g.substring(l,k)==h.substring(l,k)?l=i=k:j=k,k=Math.floor((j-i)/2+i)}return k};a.prototype.diff_commonSuffix=function(g,h){if(!g||!h||g.charAt(g.length-1)!=h.charAt(h.length-1)){return 0}for(var i=0,j=Math.min(g.length,h.length),k=j,l=0;i<k;){g.substring(g.length-k,g.length-l)==h.substring(h.length-k,h.length-l)?l=i=k:j=k,k=Math.floor((j-i)/2+i)}return k};a.prototype.diff_commonOverlap_=function(g,h){var i=g.length,j=h.length;if(0==i||0==j){return 0}i>j?g=g.substring(i-j):i<j&&(h=h.substring(0,i));i=Math.min(i,j);if(g==h){return i}for(var j=0,k=1;;){var l=g.substring(i-k),l=h.indexOf(l);if(-1==l){return j}k+=l;if(0==l||g.substring(i-k)==h.substring(0,k)){j=k,k++}}};a.prototype.diff_halfMatch_=function(i,k){function l(f,t,u){for(var v=f.substring(u,u+Math.floor(f.length/4)),w=-1,x="",y,z,C,A;-1!=(w=t.indexOf(v,w+1));){var B=o.diff_commonPrefix(f.substring(u),t.substring(w)),D=o.diff_commonSuffix(f.substring(0,u),t.substring(0,w));x.length<D+B&&(x=t.substring(w-D,w)+t.substring(w,w+B),y=f.substring(0,u-D),z=f.substring(u+B),C=t.substring(0,w-D),A=t.substring(w+B))}return 2*x.length>=f.length?[y,z,C,A,x]:null}if(0>=this.Diff_Timeout){return null}var m=i.length>k.length?i:k,n=i.length>k.length?k:i;if(4>m.length||2*n.length<m.length){return null}var o=this,p=l(m,n,Math.ceil(m.length/4)),m=l(m,n,Math.ceil(m.length/2)),q;if(!p&&!m){return null}q=m?p?p[4].length>m[4].length?p:m:m:p;var r;i.length>k.length?(p=q[0],m=q[1],n=q[2],r=q[3]):(n=q[0],r=q[1],p=q[2],m=q[3]);q=q[4];return[p,m,n,r,q]};a.prototype.diff_cleanupSemantic=function(k){for(var l=!1,m=[],n=0,o=null,p=0,q=0,r=0,t=0,s=0;p<k.length;){0==k[p][0]?(m[n++]=p,q=t,r=s,s=t=0,o=k[p][1]):(1==k[p][0]?t+=k[p][1].length:s+=k[p][1].length,o&&(o.length<=Math.max(q,r)&&o.length<=Math.max(t,s))&&(k.splice(m[n-1],0,[-1,o]),k[m[n-1]+1][0]=1,n--,n--,p=0<n?m[n-1]:-1,s=t=r=q=0,o=null,l=!0)),p++}l&&this.diff_cleanupMerge(k);this.diff_cleanupSemanticLossless(k);for(p=1;p<k.length;){if(-1==k[p-1][0]&&1==k[p][0]){l=k[p-1][1];m=k[p][1];n=this.diff_commonOverlap_(l,m);o=this.diff_commonOverlap_(m,l);if(n>=o){if(n>=l.length/2||n>=m.length/2){k.splice(p,0,[0,m.substring(0,n)]),k[p-1][1]=l.substring(0,l.length-n),k[p+1][1]=m.substring(n),p++}}else{if(o>=l.length/2||o>=m.length/2){k.splice(p,0,[0,l.substring(0,o)]),k[p-1][0]=1,k[p-1][1]=m.substring(0,m.length-o),k[p+1][0]=-1,k[p+1][1]=l.substring(o),p++}}p++}p++}};a.prototype.diff_cleanupSemanticLossless=function(l){function m(k,w){if(!k||!w){return 6}var x=k.charAt(k.length-1),y=w.charAt(0),z=x.match(a.nonAlphaNumericRegex_),A=y.match(a.nonAlphaNumericRegex_),B=z&&x.match(a.whitespaceRegex_),C=A&&y.match(a.whitespaceRegex_),x=B&&x.match(a.linebreakRegex_),y=C&&y.match(a.linebreakRegex_),D=x&&k.match(a.blanklineEndRegex_),E=y&&w.match(a.blanklineStartRegex_);return D||E?5:x||y?4:z&&!B&&C?3:B||C?2:z||A?1:0}for(var n=1;n<l.length-1;){if(0==l[n-1][0]&&0==l[n+1][0]){var o=l[n-1][1],p=l[n][1],q=l[n+1][1],r=this.diff_commonSuffix(o,p);if(r){var s=p.substring(p.length-r),o=o.substring(0,o.length-r),p=s+p.substring(0,p.length-r),q=s+q}for(var r=o,s=p,u=q,t=m(o,p)+m(p,q);p.charAt(0)===q.charAt(0);){var o=o+p.charAt(0),p=p.substring(1)+q.charAt(0),q=q.substring(1),v=m(o,p)+m(p,q);v>=t&&(t=v,r=o,s=p,u=q)}l[n-1][1]!=r&&(r?l[n-1][1]=r:(l.splice(n-1,1),n--),l[n][1]=s,u?l[n+1][1]=u:(l.splice(n+1,1),n--))}n++}};a.nonAlphaNumericRegex_=/[^a-zA-Z0-9]/;a.whitespaceRegex_=/\s/;a.linebreakRegex_=/[\r\n]/;a.blanklineEndRegex_=/\n\r?\n$/;a.blanklineStartRegex_=/^\r?\n\r?\n/;a.prototype.diff_cleanupEfficiency=function(k){for(var l=!1,m=[],n=0,o=null,p=0,q=!1,r=!1,t=!1,s=!1;p<k.length;){if(0==k[p][0]){k[p][1].length<this.Diff_EditCost&&(t||s)?(m[n++]=p,q=t,r=s,o=k[p][1]):(n=0,o=null),t=s=!1}else{if(-1==k[p][0]?s=!0:t=!0,o&&(q&&r&&t&&s||o.length<this.Diff_EditCost/2&&3==q+r+t+s)){k.splice(m[n-1],0,[-1,o]),k[m[n-1]+1][0]=1,n--,o=null,q&&r?(t=s=!0,n=0):(n--,p=0<n?m[n-1]:-1,t=s=!1),l=!0}}p++}l&&this.diff_cleanupMerge(k)};a.prototype.diff_cleanupMerge=function(h){h.push([0,""]);for(var i=0,j=0,k=0,l="",m="",n;i<h.length;){switch(h[i][0]){case 1:k++;m+=h[i][1];i++;break;case -1:j++;l+=h[i][1];i++;break;case 0:1<j+k?(0!==j&&0!==k&&(n=this.diff_commonPrefix(m,l),0!==n&&(0<i-j-k&&0==h[i-j-k-1][0]?h[i-j-k-1][1]+=m.substring(0,n):(h.splice(0,0,[0,m.substring(0,n)]),i++),m=m.substring(n),l=l.substring(n)),n=this.diff_commonSuffix(m,l),0!==n&&(h[i][1]=m.substring(m.length-n)+h[i][1],m=m.substring(0,m.length-n),l=l.substring(0,l.length-n))),0===j?h.splice(i-k,j+k,[1,m]):0===k?h.splice(i-j,j+k,[-1,l]):h.splice(i-j-k,j+k,[-1,l],[1,m]),i=i-j-k+(j?1:0)+(k?1:0)+1):0!==i&&0==h[i-1][0]?(h[i-1][1]+=h[i][1],h.splice(i,1)):i++,j=k=0,m=l=""}}""===h[h.length-1][1]&&h.pop();j=!1;for(i=1;i<h.length-1;){0==h[i-1][0]&&0==h[i+1][0]&&(h[i][1].substring(h[i][1].length-h[i-1][1].length)==h[i-1][1]?(h[i][1]=h[i-1][1]+h[i][1].substring(0,h[i][1].length-h[i-1][1].length),h[i+1][1]=h[i-1][1]+h[i+1][1],h.splice(i-1,1),j=!0):h[i][1].substring(0,h[i+1][1].length)==h[i+1][1]&&(h[i-1][1]+=h[i+1][1],h[i][1]=h[i][1].substring(h[i+1][1].length)+h[i+1][1],h.splice(i+1,1),j=!0)),i++}j&&this.diff_cleanupMerge(h)};a.prototype.diff_xIndex=function(h,i){var j=0,k=0,l=0,m=0,n;for(n=0;n<h.length;n++){1!==h[n][0]&&(j+=h[n][1].length);-1!==h[n][0]&&(k+=h[n][1].length);if(j>i){break}l=j;m=k}return h.length!=n&&-1===h[n][0]?m:m+(i-l)};a.prototype.diff_prettyHtml=function(i){for(var k=[],l=/&/g,m=/</g,n=/>/g,o=/\n/g,p=0;p<i.length;p++){var q=i[p][0],r=i[p][1],r=r.replace(l,"&amp;").replace(m,"&lt;").replace(n,"&gt;").replace(o,"&para;<br>");switch(q){case 1:k[p]='<ins style="background:#e6ffe6;">'+r+"</ins>";break;case -1:k[p]='<del style="background:#ffe6e6;">'+r+"</del>";break;case 0:k[p]="<span>"+r+"</span>"}}return k.join("")};a.prototype.diff_text1=function(d){for(var e=[],f=0;f<d.length;f++){1!==d[f][0]&&(e[f]=d[f][1])}return e.join("")};a.prototype.diff_text2=function(d){for(var e=[],f=0;f<d.length;f++){-1!==d[f][0]&&(e[f]=d[f][1])}return e.join("")};a.prototype.diff_levenshtein=function(h){for(var i=0,j=0,k=0,l=0;l<h.length;l++){var m=h[l][0],n=h[l][1];switch(m){case 1:j+=n.length;break;case -1:k+=n.length;break;case 0:i+=Math.max(j,k),k=j=0}}return i+=Math.max(j,k)};a.prototype.diff_toDelta=function(d){for(var e=[],f=0;f<d.length;f++){switch(d[f][0]){case 1:e[f]="+"+encodeURI(d[f][1]);break;case -1:e[f]="-"+d[f][1].length;break;case 0:e[f]="="+d[f][1].length}}return e.join("\t").replace(/%20/g," ")};a.prototype.diff_fromDelta=function(k,l){for(var m=[],n=0,o=0,p=l.split(/\t/g),q=0;q<p.length;q++){var r=p[q].substring(1);switch(p[q].charAt(0)){case"+":try{m[n++]=[1,decodeURI(r)]}catch(t){throw Error("Illegal escape in diff_fromDelta: "+r)}break;case"-":case"=":var s=parseInt(r,10);if(isNaN(s)||0>s){throw Error("Invalid number in diff_fromDelta: "+r)}r=k.substring(o,o+=s);"="==p[q].charAt(0)?m[n++]=[0,r]:m[n++]=[-1,r];break;default:if(p[q]){throw Error("Invalid diff operation in diff_fromDelta: "+p[q])}}}if(o!=k.length){throw Error("Delta length ("+o+") does not equal source text length ("+k.length+").")}return m};a.prototype.match_main=function(d,e,f){if(null==d||null==e||null==f){throw Error("Null input. (match_main)")}f=Math.max(0,Math.min(f,d.length));return d==e?0:d.length?d.substring(f,f+e.length)==e?f:this.match_bitap_(d,e,f):-1};a.prototype.match_bitap_=function(l,m,n){function o(b,c){var f=b/m.length,h=Math.abs(n-c);return !u.Match_Distance?h?1:f:f+h/u.Match_Distance}if(m.length>this.Match_MaxBits){throw Error("Pattern too long for this browser.")}var s=this.match_alphabet_(m),u=this,v=this.Match_Threshold,x=l.indexOf(m,n);-1!=x&&(v=Math.min(o(0,x),v),x=l.lastIndexOf(m,n+m.length),-1!=x&&(v=Math.min(o(0,x),v)));for(var z=1<<m.length-1,x=-1,y,A,C=m.length+l.length,D,E=0;E<m.length;E++){y=0;for(A=C;y<A;){o(E,n+A)<=v?y=A:C=A,A=Math.floor((C-y)/2+y)}C=A;y=Math.max(1,n-A+1);var B=Math.min(n+A,l.length)+m.length;A=Array(B+2);for(A[B+1]=(1<<E)-1;B>=y;B--){var F=s[l.charAt(B-1)];A[B]=0===E?(A[B+1]<<1|1)&F:(A[B+1]<<1|1)&F|((D[B+1]|D[B])<<1|1)|D[B+1];if(A[B]&z&&(F=o(E,B-1),F<=v)){if(v=F,x=B-1,x>n){y=Math.max(1,2*n-x)}else{break}}}if(o(E+1,n)>v){break}D=A}return x};a.prototype.match_alphabet_=function(d){for(var e={},f=0;f<d.length;f++){e[d.charAt(f)]=0}for(f=0;f<d.length;f++){e[d.charAt(f)]|=1<<d.length-f-1}return e};a.prototype.patch_addContext_=function(e,f){if(0!=f.length){for(var g=f.substring(e.start2,e.start2+e.length1),h=0;f.indexOf(g)!=f.lastIndexOf(g)&&g.length<this.Match_MaxBits-this.Patch_Margin-this.Patch_Margin;){h+=this.Patch_Margin,g=f.substring(e.start2-h,e.start2+e.length1+h)}h+=this.Patch_Margin;(g=f.substring(e.start2-h,e.start2))&&e.diffs.unshift([0,g]);(h=f.substring(e.start2+e.length1,e.start2+e.length1+h))&&e.diffs.push([0,h]);e.start1-=g.length;e.start2-=g.length;e.length1+=g.length+h.length;e.length2+=g.length+h.length}};a.prototype.patch_make=function(l,m,n){var o;if("string"==typeof l&&"string"==typeof m&&"undefined"==typeof n){o=l,m=this.diff_main(o,m,!0),2<m.length&&(this.diff_cleanupSemantic(m),this.diff_cleanupEfficiency(m))}else{if(l&&"object"==typeof l&&"undefined"==typeof m&&"undefined"==typeof n){m=l,o=this.diff_text1(m)}else{if("string"==typeof l&&m&&"object"==typeof m&&"undefined"==typeof n){o=l}else{if("string"==typeof l&&"string"==typeof m&&n&&"object"==typeof n){o=l,m=n}else{throw Error("Unknown call format to patch_make.")}}}}if(0===m.length){return[]}n=[];l=new a.patch_obj;for(var p=0,q=0,r=0,s=o,u=0;u<m.length;u++){var t=m[u][0],v=m[u][1];!p&&0!==t&&(l.start1=q,l.start2=r);switch(t){case 1:l.diffs[p++]=m[u];l.length2+=v.length;o=o.substring(0,r)+v+o.substring(r);break;case -1:l.length1+=v.length;l.diffs[p++]=m[u];o=o.substring(0,r)+o.substring(r+v.length);break;case 0:v.length<=2*this.Patch_Margin&&p&&m.length!=u+1?(l.diffs[p++]=m[u],l.length1+=v.length,l.length2+=v.length):v.length>=2*this.Patch_Margin&&p&&(this.patch_addContext_(l,s),n.push(l),l=new a.patch_obj,p=0,s=o,q=r)}1!==t&&(q+=v.length);-1!==t&&(r+=v.length)}p&&(this.patch_addContext_(l,s),n.push(l));return n};a.prototype.patch_deepCopy=function(g){for(var h=[],i=0;i<g.length;i++){var j=g[i],k=new a.patch_obj;k.diffs=[];for(var l=0;l<j.diffs.length;l++){k.diffs[l]=j.diffs[l].slice()}k.start1=j.start1;k.start2=j.start2;k.length1=j.length1;k.length2=j.length2;h[i]=k}return h};a.prototype.patch_apply=function(l,m){if(0==l.length){return[m,[]]}l=this.patch_deepCopy(l);var n=this.patch_addPadding(l);m=n+m+n;this.patch_splitMax(l);for(var o=0,p=[],r=0;r<l.length;r++){var s=l[r].start2+o,t=this.diff_text1(l[r].diffs),v,u=-1;if(t.length>this.Match_MaxBits){if(v=this.match_main(m,t.substring(0,this.Match_MaxBits),s),-1!=v&&(u=this.match_main(m,t.substring(t.length-this.Match_MaxBits),s+t.length-this.Match_MaxBits),-1==u||v>=u)){v=-1}}else{v=this.match_main(m,t,s)}if(-1==v){p[r]=!1,o-=l[r].length2-l[r].length1}else{if(p[r]=!0,o=v-s,s=-1==u?m.substring(v,v+t.length):m.substring(v,u+this.Match_MaxBits),t==s){m=m.substring(0,v)+this.diff_text2(l[r].diffs)+m.substring(v+t.length)}else{if(s=this.diff_main(t,s,!1),t.length>this.Match_MaxBits&&this.diff_levenshtein(s)/t.length>this.Patch_DeleteThreshold){p[r]=!1}else{this.diff_cleanupSemanticLossless(s);for(var t=0,w,u=0;u<l[r].diffs.length;u++){var x=l[r].diffs[u];0!==x[0]&&(w=this.diff_xIndex(s,t));1===x[0]?m=m.substring(0,v+w)+x[1]+m.substring(v+w):-1===x[0]&&(m=m.substring(0,v+w)+m.substring(v+this.diff_xIndex(s,t+x[1].length)));-1!==x[0]&&(t+=x[1].length)}}}}}m=m.substring(n.length,m.length-n.length);return[m,p]};a.prototype.patch_addPadding=function(g){for(var h=this.Patch_Margin,i="",j=1;j<=h;j++){i+=String.fromCharCode(j)}for(j=0;j<g.length;j++){g[j].start1+=h,g[j].start2+=h}var j=g[0],k=j.diffs;if(0==k.length||0!=k[0][0]){k.unshift([0,i]),j.start1-=h,j.start2-=h,j.length1+=h,j.length2+=h}else{if(h>k[0][1].length){var l=h-k[0][1].length;k[0][1]=i.substring(k[0][1].length)+k[0][1];j.start1-=l;j.start2-=l;j.length1+=l;j.length2+=l}}j=g[g.length-1];k=j.diffs;0==k.length||0!=k[k.length-1][0]?(k.push([0,i]),j.length1+=h,j.length2+=h):h>k[k.length-1][1].length&&(l=h-k[k.length-1][1].length,k[k.length-1][1]+=i.substring(0,l),j.length1+=l,j.length2+=l);return i};a.prototype.patch_splitMax=function(k){for(var l=this.Match_MaxBits,m=0;m<k.length;m++){if(!(k[m].length1<=l)){var n=k[m];k.splice(m--,1);for(var o=n.start1,p=n.start2,q="";0!==n.diffs.length;){var r=new a.patch_obj,t=!0;r.start1=o-q.length;r.start2=p-q.length;""!==q&&(r.length1=r.length2=q.length,r.diffs.push([0,q]));for(;0!==n.diffs.length&&r.length1<l-this.Patch_Margin;){var q=n.diffs[0][0],s=n.diffs[0][1];1===q?(r.length2+=s.length,p+=s.length,r.diffs.push(n.diffs.shift()),t=!1):-1===q&&1==r.diffs.length&&0==r.diffs[0][0]&&s.length>2*l?(r.length1+=s.length,o+=s.length,t=!1,r.diffs.push([q,s]),n.diffs.shift()):(s=s.substring(0,l-r.length1-this.Patch_Margin),r.length1+=s.length,o+=s.length,0===q?(r.length2+=s.length,p+=s.length):t=!1,r.diffs.push([q,s]),s==n.diffs[0][1]?n.diffs.shift():n.diffs[0][1]=n.diffs[0][1].substring(s.length))}q=this.diff_text2(r.diffs);q=q.substring(q.length-this.Patch_Margin);s=this.diff_text1(n.diffs).substring(0,this.Patch_Margin);""!==s&&(r.length1+=s.length,r.length2+=s.length,0!==r.diffs.length&&0===r.diffs[r.diffs.length-1][0]?r.diffs[r.diffs.length-1][1]+=s:r.diffs.push([0,s]));t||k.splice(++m,0,r)}}}};a.prototype.patch_toText=function(d){for(var e=[],f=0;f<d.length;f++){e[f]=d[f]}return e.join("")};a.prototype.patch_fromText=function(i){var j=[];if(!i){return j}i=i.split("\n");for(var k=0,l=/^@@ -(\d+),?(\d*) \+(\d+),?(\d*) @@$/;k<i.length;){var m=i[k].match(l);if(!m){throw Error("Invalid patch string: "+i[k])}var n=new a.patch_obj;j.push(n);n.start1=parseInt(m[1],10);""===m[2]?(n.start1--,n.length1=1):"0"==m[2]?n.length1=0:(n.start1--,n.length1=parseInt(m[2],10));n.start2=parseInt(m[3],10);""===m[4]?(n.start2--,n.length2=1):"0"==m[4]?n.length2=0:(n.start2--,n.length2=parseInt(m[4],10));for(k++;k<i.length;){m=i[k].charAt(0);try{var o=decodeURI(i[k].substring(1))}catch(p){throw Error("Illegal escape in patch_fromText: "+o)}if("-"==m){n.diffs.push([-1,o])}else{if("+"==m){n.diffs.push([1,o])}else{if(" "==m){n.diffs.push([0,o])}else{if("@"==m){break}else{if(""!==m){throw Error('Invalid patch mode "'+m+'" in: '+o)}}}}}k++}}return j};a.patch_obj=function(){this.diffs=[];this.start2=this.start1=null;this.length2=this.length1=0};a.patch_obj.prototype.toString=function(){var d,e;d=0===this.length1?this.start1+",0":1==this.length1?this.start1+1:this.start1+1+","+this.length1;e=0===this.length2?this.start2+",0":1==this.length2?this.start2+1:this.start2+1+","+this.length2;d=["@@ -"+d+" +"+e+" @@\n"];var f;for(e=0;e<this.diffs.length;e++){switch(this.diffs[e][0]){case 1:f="+";break;case -1:f="-";break;case 0:f=" "}d[e+1]=f+encodeURI(this.diffs[e][1])+"\n"}return d.join("").replace(/%20/g," ")};this.diff_match_patch=a;this.DIFF_DELETE=-1;this.DIFF_INSERT=1;this.DIFF_EQUAL=0})();