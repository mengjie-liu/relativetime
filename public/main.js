const socket = io();

$(function () {
  $("#newclock").prepend(function () {
    return `
    <div id="clockrealtime">
      <div class="second-hand"></div>
      <div class="minute-hand"></div>
      <div class="hour-hand"></div>
      <div class="pin"></div>
    </div> `;
  });

  setInterval(() => {
    let date = new Date();
    let ssec = date.getSeconds() * 6;
    let smin = date.getMinutes() * 6;
    let shr = date.getHours() * 30;
    $("#clockrealtime .second-hand").css({
      transform: `rotateZ(${ssec}deg)`,
    });
    $("#clockrealtime .minute-hand").css({
      transform: `rotateZ(${smin}deg)`,
    });
    $("#clockrealtime .hour-hand").css({
      transform: `rotateZ(${shr}deg)`,
    });
  }, 1000);

  let username = localStorage.getItem("username");
  socket.on("historyclocks", (clocks) => {
    if (username === null || username === "") {
      $("#login").show();
      $("#submit").on("click", function (e) {
        e.preventDefault();
        if ($("#username").val().toUpperCase() !== "") {
          username = $("#username").val().toUpperCase();
          //save the username into localStorage
          localStorage.setItem("username", username);
          // console.log(username);

          $("#login").fadeOut("slow");
          $("#welcome").fadeIn("slow");
          $("#welcome h2").html(`welcome,&nbsp;${username}`);

          let ndt = new Date();
          let timenow = Date.now();
          for (let i = clocks.length - 1; i >= 0; i--) {
            if (clocks[i].name == username) {
              let hisclock = clocks[i];
              let hisname = hisclock.name;
              let hisdate = hisclock.datetime;
              $("#newclock .clock").after(function () {
                return `
                  <div class="his-lab">${hisname}'s&nbsp;clock</br>
                    <span>since&nbsp;${hisdate}</span>
                  </div>
                `;
              });

              let hisunit = hisclock.unit;
              let histimelapsed = (timenow - hisclock.timestamp) / 1000;
              let uhistimelapsed = histimelapsed * hisunit;
              let uhishrlapsed = Math.floor(uhistimelapsed / 3600);
              let uhisminlapsed = Math.floor(
                (uhistimelapsed - 3600 * uhishrlapsed) / 60
              );
              let uhisseclapsed =
                uhistimelapsed - 3600 * uhishrlapsed - 60 * uhisminlapsed;
              // console.log(useclapsed);

              let hissec =
                Number(ndt.getSeconds() * 6) +
                Number(uhisseclapsed * 6 * hisunit);
              if (hissec > 360) {
                hissec = hissec - 360;
              }
              //console.log(cursec);
              let hismin =
                Number(ndt.getMinutes() * 6) +
                Number(uhisminlapsed * 6 * hisunit);
              if (hismin > 360) {
                hismin = hismin - 360;
              }
              let hishr =
                Number(ndt.getHours()) * 30 +
                Number(uhishrlapsed * 30 * hisunit);
              //console.log(cursec);
              if (hishr > 360) {
                hishr = hishr - 360;
              }

              $.keyframe.define([
                {
                  name: "tick-tock-his-sec",
                  from: {
                    transform: `rotateZ(${hissec}deg)`,
                  },
                  to: {
                    transform: `rotateZ(${hissec + 360}deg)`,
                  },
                },
              ]);

              $.keyframe.define([
                {
                  name: "tick-tock-his-min",
                  from: {
                    transform: `rotateZ(${hismin}deg)`,
                  },
                  to: {
                    transform: `rotateZ(${hismin + 360}deg)`,
                  },
                },
              ]);

              $.keyframe.define([
                {
                  name: "tick-tock-his-hr",
                  from: {
                    transform: `rotateZ(${hishr}deg)`,
                  },
                  to: {
                    transform: `rotateZ(${hishr + 360}deg)`,
                  },
                },
              ]);

              $("#newclock .clock .second-hand").css({
                animation: `tick-tock-his-sec ${
                  60 * hisunit
                }s steps(60) infinite`,
              });
              $("#newclock .clock .minute-hand").css({
                animation: `tick-tock-his-min ${
                  3600 * hisunit
                }s steps(60) infinite`,
              });
              $("#newclock .clock .hour-hand").css({
                animation: `tick-tock-his-hr ${
                  60 * 3600 * hisunit
                }s steps(60) infinite`,
              });

              $("#welcome").stop().hide();
              $("#newclock").fadeIn(1000).css("filter", "blur(0)");

              break;
            }
          }
        }
      });
    } else {
      let ndt = new Date();
      let timenow = Date.now();

      for (let i = clocks.length - 1; i >= 0; i--) {
        if (clocks[i].name == username) {
          let hisclock = clocks[i];
          let hisname = hisclock.name;
          let hisdate = hisclock.datetime;
          $("#newclock .clock").after(function () {
            return `
            <div class="his-lab">${hisname}'s&nbsp;clock</br>
              <span>since&nbsp;${hisdate}</span>
            </div>
           `;
          });

          let hisunit = hisclock.unit;
          let histimelapsed = (timenow - hisclock.timestamp) / 1000;
          let uhistimelapsed = histimelapsed * hisunit;
          let uhishrlapsed = Math.floor(uhistimelapsed / 3600);
          let uhisminlapsed = Math.floor(
            (uhistimelapsed - 3600 * uhishrlapsed) / 60
          );
          let uhisseclapsed =
            uhistimelapsed - 3600 * uhishrlapsed - 60 * uhisminlapsed;
          // console.log(useclapsed);

          let hissec =
            Number(ndt.getSeconds() * 6) + Number(uhisseclapsed * 6 * hisunit);
          if (hissec > 360) {
            hissec = hissec - 360;
          }
          //console.log(cursec);
          let hismin =
            Number(ndt.getMinutes() * 6) + Number(uhisminlapsed * 6 * hisunit);
          if (hismin > 360) {
            hismin = hismin - 360;
          }
          let hishr =
            Number(ndt.getHours()) * 30 + Number(uhishrlapsed * 30 * hisunit);
          //console.log(cursec);
          if (hishr > 360) {
            hishr = hishr - 360;
          }

          $.keyframe.define([
            {
              name: "tick-tock-his-sec",
              from: {
                transform: `rotateZ(${hissec}deg)`,
              },
              to: {
                transform: `rotateZ(${hissec + 360}deg)`,
              },
            },
          ]);

          $.keyframe.define([
            {
              name: "tick-tock-his-min",
              from: {
                transform: `rotateZ(${hismin}deg)`,
              },
              to: {
                transform: `rotateZ(${hismin + 360}deg)`,
              },
            },
          ]);

          $.keyframe.define([
            {
              name: "tick-tock-his-hr",
              from: {
                transform: `rotateZ(${hishr}deg)`,
              },
              to: {
                transform: `rotateZ(${hishr + 360}deg)`,
              },
            },
          ]);

          $("#newclock .clock .second-hand").css({
            animation: `tick-tock-his-sec ${60 * hisunit}s steps(60) infinite`,
          });
          $("#newclock .clock .minute-hand").css({
            animation: `tick-tock-his-min ${
              3600 * hisunit
            }s steps(60) infinite`,
          });
          $("#newclock .clock .hour-hand").css({
            animation: `tick-tock-his-hr ${
              60 * 3600 * hisunit
            }s steps(60) infinite`,
          });
          break;
        }
      }

      $("#newclock").fadeIn(1000).css("filter", "blur(0)");
      $("#welcome h2").html(`welcome,&nbsp;${username}`);
    }

    $("#newclock .clock")
      .mouseenter(function () {
        //console.log("ha!");
        $("#clockrealtime").css("visibility", "visible");
      })
      .mouseleave(function () {
        $("#clockrealtime").css("visibility", "hidden");
      });

    $("#galt").on("click", function () {
      $("#newclock").fadeOut(5);

      if ($("#gallery").length) {
        $("#gallery").fadeIn(1000);
        $(".displayclock").fadeIn(1500);
        $("#realtimeall").fadeIn(1500);
      } else {
        $("#newclock").after(function () {
          return `
        <div id="gallery"></div>
        <h1 id="goback">back</h1>
        <div id="realtime">
          <div class="second-hand"></div>
          <div class="minute-hand"></div>
          <div class="hour-hand"></div>
          <div class="pin"></div>
        </div> 
      `;
        });

        let dt = new Date();
        let ssec = dt.getSeconds() * 6;
        let smin = dt.getMinutes() * 6;
        let shr = dt.getHours() * 30;

        $.keyframe.define([
          {
            name: "tick-tock-sec",
            from: {
              transform: `rotate(${ssec}deg)`,
            },
            to: {
              transform: `rotateZ(${ssec + 360}deg)`,
            },
          },
        ]);

        $.keyframe.define([
          {
            name: "tick-tock-min",
            from: {
              transform: `rotate(${smin}deg)`,
            },
            to: {
              transform: `rotateZ(${smin + 360}deg)`,
            },
          },
        ]);

        $.keyframe.define([
          {
            name: "tick-tock-hr",
            from: {
              transform: `rotate(${shr}deg)`,
            },
            to: {
              transform: `rotateZ(${shr + 360}deg)`,
            },
          },
        ]);

        $("#realtime .second-hand").css({
          animation: `tick-tock-sec 60s steps(60) infinite`,
        });
        $("#realtime .minute-hand").css({
          animation: `tick-tock-min 3600s steps(60) infinite`,
        });
        $("#realtime .hour-hand").css({
          animation: `tick-tock-hr 216000s steps(60) infinite`,
        });

        let i = 1;
        let ndt = new Date();
        let timenow = Date.now();

        for (let clock of clocks) {
          let date = clock.datetime;

          $("#gallery").prepend(`
          <div class="displayclock">
            <div id="csec${i}" class="dis-second-hand"></div>
            <div id="cmin${i}" class="dis-minute-hand"></div>
            <div id="chr${i}" class="dis-hour-hand"></div>
            <div class="dis-lab">${clock.name}'s&nbsp;clock</br>
              <span>since&nbsp;${date}</span>
            </div>
          </div>
          `);

          let uunit = clock.unit;
          let timelapsed = (timenow - clock.timestamp) / 1000;
          let utimelapsed = timelapsed * uunit;
          let uhrlapsed = Math.floor(utimelapsed / 3600);
          let uminlapsed = Math.floor((utimelapsed - 3600 * uhrlapsed) / 60);
          let useclapsed = utimelapsed - 3600 * uhrlapsed - 60 * uminlapsed;
          // console.log(useclapsed);

          let cursec =
            Number(ndt.getSeconds() * 6) + Number(useclapsed * 6 * uunit);
          if (cursec > 360) {
            cursec = cursec - 360;
          }
          //console.log(cursec);
          let curmin =
            Number(ndt.getMinutes() * 6) + Number(uminlapsed * 6 * uunit);
          if (curmin > 360) {
            curmin = curmin - 360;
          }
          let curhr =
            Number(ndt.getHours()) * 30 + Number(uhrlapsed * 30 * uunit);
          //console.log(cursec);
          if (curhr > 360) {
            curhr = curhr - 360;
          }

          $.keyframe.define([
            {
              name: `tick-tock-dis-sec${i}`,
              from: {
                transform: `rotateZ(${cursec}deg)`,
              },
              to: {
                transform: `rotateZ(${cursec + 360}deg)`,
              },
            },
          ]);

          $.keyframe.define([
            {
              name: `tick-tock-dis-min${i}`,
              from: {
                transform: `rotateZ(${curmin}deg)`,
              },
              to: {
                transform: `rotateZ(${curmin + 360}deg)`,
              },
            },
          ]);

          $.keyframe.define([
            {
              name: `tick-tock-dis-hr${i}`,
              from: {
                transform: `rotateZ(${curhr}deg)`,
              },
              to: {
                transform: `rotateZ(${curhr + 360}deg)`,
              },
            },
          ]);

          $("#csec" + i).css({
            animation: `tick-tock-dis-sec${i} ${
              60 * uunit
            }s steps(60) infinite`,
          });
          $("#cmin" + i).css({
            animation: `tick-tock-dis-min${i} ${
              3600 * uunit
            }s steps(60) infinite`,
          });
          $("#chr" + i).css({
            animation: `tick-tock-dis-hr${i} ${
              60 * 3600 * uunit
            }s steps(60) infinite`,
          });

          i++;
        }
        $("#gallery div").first().remove();

        // $("#gallery").fadeIn(1000).css("filter", "blur(0)");
        $("#gallery").show().css("filter", "blur(0)");
        $("#realtime").fadeIn(1500);
      }

      $("#goback").on("click", function () {
        $(this).remove();
        $("#gallery").delay(1000).remove();
        // $(".displayclock").fadeOut(500);
        $("#realtime").delay(1000).remove();
        $("#newclock").fadeIn(750);

        // date = new Date();
      });
    });

    $("#redo").on("click", function () {
      $("#welcome").fadeIn(1000);
      $("#newclock").hide();
      let removeinfo = {
        name: username,
      };
      socket.emit("removeclock", removeinfo);
    });
  });

  let lastTime = 0;
  $(window).keypress(function (e) {
    if (e.keyCode == 32) {
      // user has pressed space
      $("#welcome").css("filter", "blur(10px)");
      if (lastTime === 0) {
        lastTime = Date.now();
      } else {
        let duration = (Date.now() - lastTime) / 1000;
        lastTime = 0;
        $("#welcome").fadeOut(500);
        $("#newclock").fadeIn(2500).css("filter", "blur(0)");
        var unit = duration / 10;
        let dt = new Date();
        let ssec = dt.getSeconds() * 6;
        let smin = dt.getMinutes() * 6;
        let shr = dt.getHours() * 30;
        let year = dt.getFullYear();
        let month = dt.getMonth() + 1;
        let date = dt.getDate();

        let dati = `${year}-${month}-${date}`;
        // console.log(dati);

        $.keyframe.define([
          {
            name: "tick-tock-sec",
            from: {
              transform: `rotate(${ssec}deg)`,
            },
            to: {
              transform: `rotateZ(${ssec + 360}deg)`,
            },
          },
        ]);

        $.keyframe.define([
          {
            name: "tick-tock-min",
            from: {
              transform: `rotate(${smin}deg)`,
            },
            to: {
              transform: `rotateZ(${smin + 360}deg)`,
            },
          },
        ]);

        $.keyframe.define([
          {
            name: "tick-tock-hr",
            from: {
              transform: `rotate(${shr}deg)`,
            },
            to: {
              transform: `rotateZ(${shr + 360}deg)`,
            },
          },
        ]);

        $("#newclock .clock .second-hand").css({
          animation: `tick-tock-sec ${60 * unit}s steps(60) infinite`,
        });
        $("#newclock .clock .minute-hand").css({
          animation: `tick-tock-min ${3600 * unit}s steps(60) infinite`,
        });
        $("#newclock .clock .hour-hand").css({
          animation: `tick-tock-hr ${60 * 3600 * unit}s steps(60) infinite`,
        });
        $(".his-lab").remove();
        $("#newclock .clock").after(function () {
          return `
          <div class="lab">${username}'s&nbsp;clock</br>
            <span>since&nbsp;${dati}</span>
          </div>
         `;
        });

        let clockinfo = {
          name: username,
          unit: unit,
          timestamp: Date.now(),
          datetime: dati,
        };
        socket.emit("userclock", clockinfo);
      }
    }
  });

  socket.on("newhistoryclocks", (allclocks) => {
    $("#galt").on("click", function () {
      $("#newclock").fadeOut(5);

      //console.log("yay!");

      if ($("#gallery").length) {
        $("#gallery").remove();
        // $(".displayclock").fadeIn(1500);
        $("#realtime").remove();
      }
      // else {
      $("#newclock").after(function () {
        return `
        <div id="gallery"></div>
        <h1 id="goback">back</h1>
        <div id="realtime">
          <div class="second-hand"></div>
          <div class="minute-hand"></div>
          <div class="hour-hand"></div>
          <div class="pin"></div>
        </div> 
      `;
      });

      let dt = new Date();
      let ssec = dt.getSeconds() * 6;
      let smin = dt.getMinutes() * 6;
      let shr = dt.getHours() * 30;

      $.keyframe.define([
        {
          name: "tick-tock-sec",
          from: {
            transform: `rotate(${ssec}deg)`,
          },
          to: {
            transform: `rotateZ(${ssec + 360}deg)`,
          },
        },
      ]);

      $.keyframe.define([
        {
          name: "tick-tock-min",
          from: {
            transform: `rotate(${smin}deg)`,
          },
          to: {
            transform: `rotateZ(${smin + 360}deg)`,
          },
        },
      ]);

      $.keyframe.define([
        {
          name: "tick-tock-hr",
          from: {
            transform: `rotate(${shr}deg)`,
          },
          to: {
            transform: `rotateZ(${shr + 360}deg)`,
          },
        },
      ]);

      $("#realtime .second-hand").css({
        animation: `tick-tock-sec 60s steps(60) infinite`,
      });
      $("#realtime .minute-hand").css({
        animation: `tick-tock-min 3600s steps(60) infinite`,
      });
      $("#realtime .hour-hand").css({
        animation: `tick-tock-hr 216000s steps(60) infinite`,
      });

      let i = 1;
      let ndt = new Date();
      let timenow = Date.now();

      for (let allclock of allclocks) {
        let date = allclock.datetime;

        $("#gallery").prepend(`
          <div class="displayclock">
            <div id="csec${i}" class="dis-second-hand"></div>
            <div id="cmin${i}" class="dis-minute-hand"></div>
            <div id="chr${i}" class="dis-hour-hand"></div>
            <div class="dis-lab">${allclock.name}'s&nbsp;clock</br>
              <span>since&nbsp;${date}</span>
            </div>
          </div>
          `);

        let uunit = allclock.unit;
        let timelapsed = (timenow - allclock.timestamp) / 1000;
        let utimelapsed = timelapsed * uunit;
        let uhrlapsed = Math.floor(utimelapsed / 3600);
        let uminlapsed = Math.floor((utimelapsed - 3600 * uhrlapsed) / 60);
        let useclapsed = utimelapsed - 3600 * uhrlapsed - 60 * uminlapsed;
        // console.log(useclapsed);

        let cursec =
          Number(ndt.getSeconds() * 6) + Number(useclapsed * 6 * uunit);
        if (cursec > 360) {
          cursec = cursec - 360;
        }
        //console.log(cursec);
        let curmin =
          Number(ndt.getMinutes() * 6) + Number(uminlapsed * 6 * uunit);
        if (curmin > 360) {
          curmin = curmin - 360;
        }
        let curhr =
          Number(ndt.getHours()) * 30 + Number(uhrlapsed * 30 * uunit);
        //console.log(cursec);
        if (curhr > 360) {
          curhr = curhr - 360;
        }

        $.keyframe.define([
          {
            name: `tick-tock-dis-sec${i}`,
            from: {
              transform: `rotateZ(${cursec}deg)`,
            },
            to: {
              transform: `rotateZ(${cursec + 360}deg)`,
            },
          },
        ]);

        $.keyframe.define([
          {
            name: `tick-tock-dis-min${i}`,
            from: {
              transform: `rotateZ(${curmin}deg)`,
            },
            to: {
              transform: `rotateZ(${curmin + 360}deg)`,
            },
          },
        ]);

        $.keyframe.define([
          {
            name: `tick-tock-dis-hr${i}`,
            from: {
              transform: `rotateZ(${curhr}deg)`,
            },
            to: {
              transform: `rotateZ(${curhr + 360}deg)`,
            },
          },
        ]);

        $("#csec" + i).css({
          animation: `tick-tock-dis-sec${i} ${60 * uunit}s steps(60) infinite`,
        });
        $("#cmin" + i).css({
          animation: `tick-tock-dis-min${i} ${
            3600 * uunit
          }s steps(60) infinite`,
        });
        $("#chr" + i).css({
          animation: `tick-tock-dis-hr${i} ${
            60 * 3600 * uunit
          }s steps(60) infinite`,
        });

        i++;
      }
      $("#gallery div").first().remove();
      $("#gallery").fadeIn(1000).css("filter", "blur(0)");
      $("#realtime").fadeIn(1500);
      // }

      $("#goback").on("click", function () {
        $(this).remove();
        $("#gallery").delay(1000).remove();
        // $(".displayclock").fadeOut(500);
        $("#realtime").delay(1000).remove();
        $("#newclock").fadeIn(750);
      });
    });
  });
});
