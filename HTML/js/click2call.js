function loadhtml(e) {
    var t = "        <div id='clicktocallPopup'>                <div class='click_to_call_form_wrapper'>                    <div class='click_to_call_form'>                        <div id='clicktocall_div' style='margin-top:1px;''>                                <div class='sr_c2c_modal_heading' style='display: none'>                                    <label id='sr_c2c__heading' style='padding-right:8px;'>Agent Number:</label>                                    <select id='sr_c2c_agent_numsDD'>                                        <option value='agent_number'>agent_number</option>                                    </select>                                </div>                                <input type='text'  id='click2call_cust_text' placeholder='Enter Number' maxlength='15' class='widget_tb'/>                                <span class='call_button'>                                    <button type='submit'  class='widget_c2c_button' id='click2call_submitbtn' style='border-radius:5px; background-color:#ff9800;color:#ffffff;margin-top: 9px'>Submit</button>                                </span>                        </div>                    </div>                    <div id='click2call_success' style='display: none' class='success_C2C'>                        Call placed.                    </div>                    <div id='click2call_failure' style='display: none' class='failure_C2C'>                        Failure.                    </div>                </div>                          </div>".replace(/agent_number/g, e.agentNum);
    $('#call').html(t);
}

function loadClick2Call(e) {
    function t(e) {
        var t = /(^\+(\d{10}|\d{12}|\d{11}|\d{13}|\d{14})|^(1800(\d{6}|\d{7}|\d{8}))|^(1888(\d{6}|\d{7}|\d{8})))$/;
        return !e || !jQuery.trim(e) || !t.test(e) ? !1 : !0
    }
    jQuery("#click2call_submitbtn").unbind("click").click(function(n) {
        n.preventDefault(), jQuery("#click2call_submitbtn").attr("disabled", !0), jQuery("#click2call_failure").hide();
        var r = e.agentNum,
            i = jQuery("#click2call_cust_text").val(),
            s = {
                api_key: e.apiKey,
                agent_number: r,
                phone_number: i,
                sr_number: e.srnumber
            };
        t(i.toString()) && t(i.toString()) ? jQuery.ajax({
            url: "https://sr.knowlarity.com/vr/api/click2call/",
            type: "POST",
            data: s,
            cache: !1,
            success: function(e) {
                jQuery(".click_to_call_form").hide(), jQuery("#click2call_success").show(), setTimeout(function() {
                    jQuery(".click_to_call_form").show(), jQuery("#click2call_success").hide()
                }, 5e3), jQuery("#click2call_submitbtn").attr("disabled", !1)
            },
            error: function(e, t, n) {
                jQuery(".click_to_call_form").hide(), jQuery("#click2call_failure").show(), setTimeout(function() {
                    jQuery("#click2call_failure").hide(), jQuery(".click_to_call_form").show()
                }, 5e3), jQuery("#click2call_submitbtn").attr("disabled", !1)
            }
        }) : (alert("Number should be in international format like +919999988888."), jQuery("#click2call_submitbtn").attr("disabled", !1))
    })
}

function init(e, t, n) {
    var r = {
        apiKey: e,
        agentNum: n,
        srnumber: t
    };
    if (typeof jQuery == "undefined") {
        typeof $ == "function" && (thisPageUsingOtherJSLibrary = !0);

        function i(e, t) {
            var n = document.createElement("script");
            n.src = e;
            var r = document.getElementsByTagName("head")[0],
                i = !1;
            n.onload = n.onreadystatechange = function() {
                !i && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete") && (i = !0, t(), n.onload = n.onreadystatechange = null, r.removeChild(n))
            }, r.appendChild(n)
        }
        i("http://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.min.js", function() {
            loadhtml(r), loadClick2Call(r)
        })
    } else loadhtml(r), loadClick2Call(r)
};