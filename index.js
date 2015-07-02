function qfuncs(data, maxTasks, func, callback) {
  console.log("paralell process started.");

  //data is an array
  //func is paralell function
  this.data = data;
  this.threads = 0;
  this.maxQue = maxTasks;
  this.processing = false;
  this.finished = false;
  this.failed = [];
  //
  var check = function(dec) {
    //console.log(" started");
    if (dec)
      this.threads--;
    while (this.processing && !this.finished);
    if (this.finished)
      return;
    this.processing = true;
    for (var i = 0; i < this.maxQue - this.threads; i++)
      if (data.length > 0) {
        this.threads++;
        var item = this.data.pop();
        console.log("+" + item.value);
        try {
          func(item, function(dec) {
            check(dec);
          });
        } catch (ex) {          
	  console.log("!" + item.value);
          check(true);
        }
      } else {
        this.finished = true;
        this.processing = false;
      }
    this.processing = false;
    //if (!processing && finished && data.length == 0)
    //callback(moment());
  }

  check(false);
  return this;
}

