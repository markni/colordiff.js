(function(){var a=this;var t=a.Colordiff;var r;if(typeof exports!=="undefined"){r=exports}else{r=a.Colordiff={}}r.VERSION="0.0.1";r.noConflict=function(){a.Colordiff=t;return this};r.compare=function(a,t,r){var v=a;var p=t;if(typeof r!=="undefined"&&r==="rgb"){v=M(a);p=M(t)}var e=v.L,f=v.a,i=v.b;var n=p.L,s=p.a,w=p.b;var c=Math.sqrt(Math.pow(f,2)+Math.pow(i,2));var l=Math.sqrt(Math.pow(s,2)+Math.pow(w,2));var u=e-n;var q=(e+n)/2;var y=(c+l)/2;var b=f+f/2*(1-Math.sqrt(Math.pow(y,7)/(Math.pow(y,7)+Math.pow(25,7))));var d=s+s/2*(1-Math.sqrt(Math.pow(y,7)/(Math.pow(y,7)+Math.pow(25,7))));var x=Math.sqrt(Math.pow(b,2)+Math.pow(i,2));var g=Math.sqrt(Math.pow(d,2)+Math.pow(w,2));var z=(x+g)/2;var C=g-x;var I=o(Math.atan2(i,b))%360;var L=o(Math.atan2(w,d))%360;var P;if(!x||!g){P=0}else if(I-L<=180){P=L-I}else if(I-L>180&&L<=I){P=L-I+360}else if(I-L>180&&L>I){P=L-I-360}var m=2*Math.sqrt(x*g)*Math.sin(h(P/2));var E;if(I-L>180){E=(I+L+360)/2}else if(I-L<=180){E=(I+L)/2}var N=1-.17*Math.cos(h(E-30))+.24*Math.cos(h(2*E))+.32*Math.cos(h(3*E+6))-.2*Math.cos(h(4*E-63));var O=1+.015*Math.pow(u-50,2)/Math.sqrt(20+Math.pow(u-50,2));var R=1+.045*z;var S=1+.015*z*N;var V=-2*Math.sqrt(Math.pow(z,7)/(Math.pow(z,7)+Math.pow(24,7)))*Math.sin(h(60*Math.exp(-1*Math.pow((E-275)/25,2))));var j=1,k=1,A=1;return Math.sqrt(Math.pow(u/(j*O),2)+Math.pow(C/(k*R),2)+Math.pow(m/(A*S),2)+V*(C/(k*R))*(m/(A*S)))};var o=function(a){return a*180/Math.PI};var h=function(a){return a*Math.PI/180};var M=function(a){for(var t in a){a[t]=a[t]/255;if(a[t]>.04045){a[t]=Math.pow((a[t]+.055)/1.055,2.4)}else{a[t]=a[t]/12.92}a[t]=a[t]*100}var r=a.r*.4124+a.g*.3576+a.b*.1805;var o=a.r*.2126+a.g*.7152+a.b*.0722;var h=a.r*.0193+a.g*.1192+a.b*.9505;var M={x:r,y:o,z:h};M.x=M.x/95.047;M.y=M.y/100;M.z=M.z/108.883;for(var t in M){if(M[t]>.008856){M[t]=Math.pow(M[t],1/3)}else{M[t]=7.787*M[t]+16/116}}var v=116*M.y-16;var p=500*(M.x-M.y);var e=200*(M.y-M.z);return{L:v,a:p,b:e}}}).call(this);
//# sourceMappingURL=colordiff-min.map