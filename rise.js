var rise = rise || {};

rise.apply = function rise(selector, parentHeight) {
    var $this = $(selector);
    var ht = 0;

    if (undefined === $this) {
        return;
    }

    var id = $this[0].id;

    // if the parent height is not passed in then we use the height of the item's parent
    if (parentHeight === undefined || undefined === parentHeight) {
        parentHeight = $this.height();
    }

    // check for a break indicator on the current selected DOM element
    if ($this.hasClass("rs-break") === true) {
        // mark all the divs below this has risen
        $("div:visible", $this).addClass('rs-risen rs-risen-default');
        return;
    }

    // check to see how many divs there are below the current div (this).  
    //	none: return because there is nothing to do
    //	1: just size this div to out size and size its interal divs
    //	> 1: interate through each of the div and resize the divs to fit without the current div (this)
    var $divs = $(" > div, > form, > iframe", $this);
    if (0 === $divs.length) {
        return;
    } else if (1 === $divs.length) {
        var $onlyDiv = $($divs[0]);
        if (!$onlyDiv.hasClass('rs-fixed')) {
            parentHeight = cdan.setTargetHeight($onlyDiv, parentHeight, 0);
            $onlyDiv.trigger("risen");
            $onlyDiv.addClass('rs-risen rs-risen-calc');
            rise($onlyDiv, parentHeight);
        }
    } else {
        //	Add up the combined height of all the fixed divs
        $divs = $("> div.rs-fixed:visible, >form.rs-fixed:visible, >iframe.rs-fixed:visible", $this);
        var fixedHeight = 0;
        for (var i = 0, len = $divs.length; i < len; ++i) {
            $($divs[i]).addClass('rs-risen rs-risen-fixed');
            $("div:visible", $divs[i]).addClass('rs-risen rs-risen-default');
            fixedHeight += $($divs[i]).outerHeight(true);
        }

        // set the height of any full size columns to the height of the parent - the height of the fixed divs
        $divs = $("> div.rs-full:visible, > form.rs-full:visible, > iframe.rs-full:visible", $this);
        for (var i = 0, len = $divs.length; i < len; ++i) {
            var $curDiv = $($divs[i]);
            ht = cdan.setTargetHeight($curDiv, parentHeight, fixedHeight);
            $curDiv.trigger("risen");
            $curDiv.addClass('rs-risen rs-risen-calc');
            rise($curDiv, ht);
        }

        //	calc the height of each of the sizeable divs as (height of current div)-(height of all fixed divs) / (number of unfixed divs)
        $divs = $("> div:visible, > form:visible, > iframe:visible", $this).not(".rs-fixed, .rs-full, .rs-3");
        if ($divs.length > 0) {
            var growHeight = Math.floor((parentHeight - fixedHeight) / $divs.length);

            //	for each sizeable div set the new height and then rise its child divs
            for (var i = 0, len = $divs.length; i < len; ++i) {
                var $curDiv = $($divs[i]);
                ht = cdan.setTargetHeight($curDiv, growHeight, 0);
                $curDiv.trigger("risen");
                $curDiv.addClass('rs-risen rs-risen-calc');
                rise($curDiv, ht);
            }
        }
    }
};

rise.resizeContent = function resizeContent(elem) {
    let p = $(elem).parent();
    let height = p.height();
    rise.apply(elem, height);
};
