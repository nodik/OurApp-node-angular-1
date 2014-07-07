process.stdin.resume();
process.stdin.setEncoding('utf8');

var input= '', readline, print;

process.stdin.on('data', function(chunk) {
    input+=chunk;
});

process.stdin.on('end', function() {
    input = input.split('\n');
    print = function(data) {process.stdout.write(data+'\n')};
    var inputLineIndex = 0;
    readline = function(){return inputLineIndex>=input.length?undefined:input[inputLineIndex++]};
    process.exit(main() || 0);
});

function main()
{
    var a=[];
    var str;
    var regex = /\s+/img
    while((str=readline())!=undefined){
        a=a.concat(str.split(regex));
    }
    a = a.filter(function(e){
        return !regex.test(e) && e!=='';
        console.log('e=',e);
    });

    a = a.map(function(e){
        return parseFloat(e);
    });

    sum = a.reduce(function(prev,curr){
        return prev+curr;
    },0);
    print(sum);
    function getRandomElement(){
        var e = Math.random()*sum;
        var lo = 0, hi = a.length- 1, mid;
        while(hi-lo>1){
            mid=Math.floor((lo+hi)/2);
            if(a[mid]>e) hi=mid;
            else lo=mid;
        }
        return lo;
    }

    print(getRandomElement());

    return 0;
}