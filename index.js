var init = e => {
  var target = e.target;
  var exportAPI = `http://localhost:9003/api`
  if (
    target.tagName === "DIV" &&
    target.getAttribute("name") === "propertiesPanel"
  ) {
    document.removeEventListener("DOMNodeInserted", init);
    System.import("bootstrap").then(function() {
      var tokenfield;
      var tokens;
      var namespacesMenu;
      var namespaceContainer;
      var textSelected = [];
      var panelGroup;
      var collapses =
        "panel-collapse-show panel-collapse-shown panel-collapse-hide panel-collapse-hidden";
      window.i18n = {
        execution_profile: [],
        investigation: []
      };
      var flattenDeep = arr1 => {
        return arr1.reduce(
          (acc, val) =>
            Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val),
          []
        );
      };
      
      var v4 =
        SystemJS._loader.modules[
          "https://cdnjs.cloudflare.com/ajax/libs/node-uuid/1.4.7/uuid.js"
        ].module.v4;
      $(`
        <style>
          #react-page.i18n-open #fullscreen-root > .view.container-view > .view.container-view {
            margin-right: 10px;
          }
          .properties_panel--editStylePanelContainerClass--VEj6f {
            display: none;
          }
          .help_widget--helpWidget--22IIi {
            display: none;
          }
          #react-page.i18n-open [name="i18nPlugin"] {
            right: 0;
          }
          [name="i18nPlugin"] {
            position: absolute;
            right: -250px;
            width: 250px;
            flex-direction: column;
            display: flex;
            bottom: 0;
            padding: 5px;
            border-left: 1px solid #ccc;
            top: 40px;
            background: #fff;
            padding-bottom: 0;
            transition: right .2s;
          }
          [name="i18nPlugin"] .i18n-toggle {
            width: 40px;
            text-align: center;
            top: 0;
            height: 40px;
            margin-right: 1px;
            position: absolute;
            right: 100%;
            padding: 10px 12px;
            line-height: 40px;
            background: #ffffff;
            border-radius: 5px 0 0 5px;
            border: 1px solid #9c9c9c;
            border-top: 0;
            border-right: 0;
            cursor: pointer;
          }
          [name="i18nPlugin"] .i18n-toggle:hover {
            background: #dfdfe0;
          }
          label {
            font-weight: bold;
            line-height: 28px;
          }
          [name="save-i18n"],
          [name="export-i18n"] {
            min-width: auto;
            padding: 4px;
          }
          [name="save-i18n"] {
            margin-left: 17px;
          }
          #autocompleteToken {
              width: 100%;
          }
          .namespace-container {
            height: 100%;
            width: 100%;
            margin-top: 5px;
            overflow-y: auto;
          }
          .panel-group-collapse-popout > .panel.panel-collapse-show + .panel-collapse-show,
          .panel-group-collapse-popout > .panel.panel-collapse-shown + .panel-collapse-show,
          .panel-group-collapse-popout > .panel.panel-collapse-show + .panel-collapse-shown,
          .panel-group-collapse-popout > .panel.panel-collapse-shown + .panel-collapse-shown {
            margin-top: 5px;
          }
          .panel.panel-collapse-shown > .panel-heading,
          .panel.panel-collapse-shown > .panel-heading:hover {
            background: #dfdfdf !important;
            padding-right: 24px;
          }
          .panel-default {
            border: none;
          }
          .panel-default > .panel-heading + .panel-collapse > .panel-body {
            min-height: 250px;
            width: 100%;
            padding: 0;
          }
          .wording-setting:first-child {
            border-top: 1px solid #ccc;
          }
          .wording-setting {
            padding: 0;
            border-top: 1px dashed #ccc;
            margin: 0!important;
          }
          .ui-state-highlight {
            height: 33px;
            border-left: 0;
            border-right: 0;
            border-bottom: 0;
            border-top: 1px dashed #ccc;
            background: #fbeebe;
          }
          .setting-header {
            position: relative;
            padding: 0 20px 0 30px;
          }
          .setting-header[aria-expanded="true"] {
            background: #eee;
          }
          .setting-header h5 {
            margin: 0;
            line-height: 32px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .show-settings {
            position: absolute;
            left: 12px;
            top: 6px;
            display: none;
            cursor: pointer;
          }
          .sortable-handler {
            width: 8px;
            height: 26px;
            top: 3px;
            left: 2px;
            cursor: move;
            position: absolute;
            background-image: url(http://localhost:9003/themes/minimalism/1.23.0/light/images/icon/icon_indicator.png);
            background-repeat: no-repeat;
            background-position: center center;
            display: none;
          }
          [role="tab"] > button.btn-icon-only,
          [role="tab"]:hover > button.btn-icon-only {
            top: 6px;
          }
          [role="tab"] > button.btn-icon-only,
          .setting-header > button.btn-icon-only {
            min-width: 0;
            width: auto;
            position: absolute;
            top: 0;
            right: 4px;
            display: none;
          }
          .setting-header:hover> .sortable-handler,
          [role="tab"]:hover > button.btn-icon-only,
          .setting-header:hover > button.btn-icon-only,
          .wording-setting:hover .show-settings,
          [aria-expanded="true"] > .show-settings {
            display: block;
          }
          [aria-expanded="true"] > .show-settings.tmicon-caret-right:before {
            content: "\\e908";
          }
          #popout-accordions .setting-body.panel-collapse > .panel-body {
            border: 0;
            min-height: 32px;
            padding: 12px;
            position: relative;
          }
          #popout-accordions .setting-body.panel-collapse > .panel-body .text-range {
            position: relative;
            z-index: 1;
          }
          #popout-accordions .setting-body.panel-collapse > .panel-body .text-range-alias {
            position: absolute;
            top: 12px;
            left: 12px;
            right: 12px;
            z-index: 0;
          }
          .settings-param {
            padding: 12px;
          }
          .settings-param ul {
            margin: 4px 0;
          }
          .popover {
            display: block !important;
            width: 250px;
          }
          .popover-content {
            padding: 12px 0;
          }
          .popover-content ul.markOpts {
            padding: 0;
            margin: 0;
          }
          .popover-content li {
            line-height: 32px;
            padding: 0 12px;
          }
          .popover-content li:hover {
            background: #eee;
          }
          .popover-content li button {
            display: inline;
            float: right;
            width: 20px !important;
          }
          .popover-content li button .tmicon-hoverable:hover {
            color: #1c73ff;
          }
          .text-range {
            line-height: 24px;
            font-size: 14px;
          }
          .text-range span {
            position: relative;
          }
          .text-range span:before {
            content: '';
            border: 1px solid #8f8f8f;
            height: 3px;
            margin-left: -1px;
            position: absolute;
            z-index: 0;
          }
          .text-range span:last-child:after {
            content: '';
            border: 1px solid #8f8f8f;
            height: 3px;
            position: absolute;
            z-index: 0;
          }
          .text-range span.ignore:last-child:after {
            border: none;
          }
          .text-range span.ignore:first-child:before {
            border: none;
          }
          .text-range .wording,
          .popover-content li.wording:hover,
          .popover-content li.wording.active {
            background: #ffd629;
          }
          .text-range .param,
          .popover-content li.param:hover,
          .popover-content li.param.active {
            background: #6bf029;
          }
          .popover-content li.param input[name="param-name"],
          .popover-content li.count input[name="countable-link"],
          .popover-content li.countable input[name="countable-name"] {
            margin-top: 2px;
            display: inline;
            margin-right: 8px;
            width: 120px;
            float: right;
            background: #ffffff;
            z-index: 100;
            position: relative;
          }
          .text-range .count,
          .popover-content li.count:hover,
          .popover-content li.count.active  {
            background: #45bfff;
          }
          .text-range .countable,
          .popover-content li.countable:hover,
          .popover-content li.countable.active {
            background: #ff92f9;
          }
          .text-range .ignore {
            background: none;
          }
          .popover-content li.ignore:hover,
          .popover-content li.ignore.active {
            background: #dfdfdf;
          }
          .popover-content li.active:after {
            content: '';
            width: 100%;
            position: absolute;
            height: 32px;
            left: 0;
            pointer-events: none;
            background: #00000033;
          }
          .toast-alert {
            top: 40px;
            left: calc((100% - 280px) / 2);
            z-index: 1000;
          }
        </style>
      `).appendTo($("head"));

      var root = $("#react-page");
      var canvs = $("canvas");
      var i18nIsOpen = $.cookie("i18n-open");
      var usedNamespaces = Object.keys(i18n);
      var exportButton;
      var saveButton;
      var checkWordingsLength = () => {
        var mergeWordings = flattenDeep(Object.keys(i18n).map(namespace => {
          var wordingsDelBtn = $(`#namespace-${namespace} > .panel-heading button`);
          i18n[namespace].length === 0 ? wordingsDelBtn.hide() : wordingsDelBtn.css('display', "");
          return i18n[namespace];
        }));
        mergeWordings.length === 0 ? saveButton.attr('disabled', true) : saveButton.attr('disabled', false);
      };
      var notification = $(`
        <div class="alert toast-alert fade" role="alert">
          <span class="tmicon"></span>
        </div>
      `);
      var closeNotification = $(`
        <a href="#" class="cancel" data-dismiss="alert" aria-label="close"><span class="tmicon tmicon-close-s tmicon-visible-low tmicon-hoverable"></span></a>
      `);
      var cancelSaveBtn;

      if (i18nIsOpen === "true") {
        root.addClass("i18n-open");
        canvs.css({
          width: canvs.width() - 10
        });
      }

      $('<div name="i18nPlugin"></div>')
        .append(
          $(
            `<div class="i18n-toggle"><i class="tmicon tmicon-globe tmicon-hoverable"></i></div>`
          ).on("click", () => {
            if (root.is(".i18n-open")) {
              root.removeClass("i18n-open");
              $.cookie("i18n-open", false);
            } else {
              root.addClass("i18n-open");
              $.cookie("i18n-open", true);
            }
          })
        )
        .append(
          $('<div></div>')
            .append(
              $(`<label>Select namespace(s):</label>`)
            )
            .append(
              (saveButton = $(`<button type="button" class="btn btn-primary btn-sm" name="save-i18n" data-toggle="modal" data-target="#saveModal" >Save</button>`))
            )
            .append(
              (exportButton = $(`<button type="button" class="btn btn-primary btn-sm" name="export-i18n" data-toggle="modal" data-target="#exportModal" >Export</button>`))
            )
        )
        .append(
          (tokenfield = $(
            `<input type="text" class="form-control" id="autocompleteToken" value="${usedNamespaces.join(',')}"/>`
          ))
        )
        .append(
          (namespaceContainer = $(
            '<div class="namespace-container"></div>'
          ).append(
            (panelGroup = $(
              `<div class="panel-group panel-group-collapse panel-group-collapse-popout" id="popout-accordions" role="tablist"></div>`
            ))
          ))
        )
        .insertAfter($('[name="propertiesPanel"]'));

      $(`
        <div class="modal fade" id="saveModal" tabindex="-1" role="dialog" aria-hidden="true">
          <div class="modal-dialog modal-xs">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" data-dismiss="modal" aria-label="Close"><span aria-hidden="true" class="tmicon tmicon-close tmicon-light tmicon-hoverable"></span></button>
                <h3 class="modal-title">Save i18n wordings</h3>
              </div>
              <div class="modal-body">
                <h3>The wordings will be saved. Are you sure to save an i18n file?</h3>
              </div>
              <div class="modal-footer"></div>
            </div>
          </div>
        </div>
      `)
      .find('.modal-footer')
      .append(
        $(`<button type="button" class="btn btn-primary">Yes!</button>`).on('click', (e) => {
          cancelSaveBtn.trigger('click');
          $.ajax({
            url: 'http://localhost:9003/api/i18n/workbench',
            method: 'post',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(i18n)
          })
          .done((data) => {
            notification
              .removeClass('alert-danger')
              .addClass('alert-success')
              .append('Wordings are saved successfully.')
              .find('.tmicon')
              .removeClass('tmicon-error')
              .addClass('tmicon-check-bold')
              .end()
              .appendTo('body')
              .delay(500)
              .addClass('in');

            setTimeout(() => {
              notification.removeClass('in');
              $.debounce(800, () => {
                notification.remove();
              });
            }, 3000)
              
          })
          .fail((req, status, error) => {
            
          });
        })
        .add(
          (cancelSaveBtn = $(`<button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>`))
        )
      )
      .end()
      .appendTo('body');

      tokenfield.token({
        allowEditing: true,
        autocomplete: {
          source: ["execution_profile", "investigation", "response", "alert"],
          allowNewTag: true
        },
        showAutocompleteOnFocus: true,
        placeholder: "Select namespace(s)",
        rules: [
          {
            name: "duplicate",
            message: "The namespace already exists"
          }
        ]
      });

      var autocomplete = $("#autocompleteToken-tokenfield");
      var excludeTooltip = 'Exclude namespace(s) from this page';
      tokens = tokenfield.data("token");
      $('.token a.tmicon').attr('title', excludeTooltip);
      
      tokenfield
        .on("change", function(e) {
          var tokenlist = tokens.getTokens();
          var i18nExistingKeys = Object.keys(i18n);
          var willAddToken = tokenlist.filter(
            token => !i18nExistingKeys.includes(token.value)
          );
          var willRemoveToken = i18nExistingKeys.filter(
            namespace =>
              tokenlist.filter(token => token.value === namespace).length === 0
          );

          if (willAddToken.length > 0) {
            willAddToken.forEach(token => {
              i18n[token.value] = [];
              addI18nNamespace(token.value, true);
            });
          }
          if (willRemoveToken.length > 0) {
            willRemoveToken.forEach(token => {
              delete i18n[token];
              removeI18nNamespace(token);
            });
          }
          setTimeout(() => {
            autocomplete.trigger("blur");
          }, 200);
          autocomplete.css({
            width: "30px"
          });
          $('.token a.tmicon').attr('title', excludeTooltip);
        })
        .on("tokenfield:createdtoken", function(e) {})
        .on("tokenfield:editedtoken", function(e) {})
        .on("tokenfield:removedtoken", function(e) {});

      autocomplete.next().attr('title', excludeTooltip).on("click", () => {
        i18n = {};
        panelGroup.empty();
        checkWordingsLength();
      });

      var addI18nNamespace = function(namespace, isExpend) {
        panelGroup.prepend(
          $(`
            <div id="namespace-${namespace}" role="namespace" class="panel panel-default ${
            isExpend ? "panel-collapse-shown" : "panel-collapse-hidden"
          }">
              <div class="panel-heading collapsed" role="tab" data-toggle="collapse" data-target="#panel-${namespace}" aria-expanded="${
            isExpend ? "true" : "false"
          }">
                <h4 class="panel-title">
                  <span class="tmicon tmicon-caret-right tmicon-hoverable"></span>
                  <span>${namespace}</span>
                </h4>
                <button name="delete-wordings" data-namespace="${namespace}" type="button" class="btn btn-link btn-icon-only" title="Remove all wordings from namespace - ${namespace}">
                  <i class="tmicon tmicon-delete"></i>
                </button>
              </div>
              <div id="panel-${namespace}" class="panel-collapse collapse ${
            isExpend ? "in" : ""
          }" role="tabpanel" aria-expanded="${isExpend ? "true" : "false"}">
                <ul class="panel-body"></ul>
              </div>
            </div>
          `)
        );
        $(`.panel-collapse`)
          .off()
          .on("show.bs.collapse", function(e) {
            if (!$(e.target).is(`[role="tabpanel"]`)) return;
            $(e.target)
              .parents(".panel")
              .removeClass(collapses)
              .addClass("panel-collapse-show");
          })
          .on("shown.bs.collapse", function(e) {
            if (!$(e.target).is(`[role="tabpanel"]`)) return;
            $(e.target)
              .parents(".panel")
              .removeClass(collapses)
              .addClass("panel-collapse-shown");
          })
          .on("hide.bs.collapse", function(e) {
            if (!$(e.target).is(`[role="tabpanel"]`)) return;
            $(e.target)
              .parents(".panel")
              .removeClass(collapses)
              .addClass("panel-collapse-hide");
          })
          .on("hidden.bs.collapse", function(e) {
            if (!$(e.target).is(`[role="tabpanel"]`)) return;
            $(e.target)
              .parents(".panel")
              .removeClass(collapses)
              .addClass("panel-collapse-hidden");
          });
      };
      var removeI18nNamespace = function(namespace) {
        $(`#namespace-${namespace}`).remove();
      };
      var updateI18nContent = function(namespace) {
        var sortIndex;
        $(`#panel-${namespace} .panel-body`)
          .empty()
          .append(
            i18n[namespace].map(node => {
              var uuid = v4();
              var panelBody;
              var marks = node.marks.reduce(markText, $());
              var settings = $(
                `<div id="settings-${uuid}" class="setting-body panel-collapse collapse" aria-expanded="false"></div>`
              ).append((panelBody = $(`<div class="panel-body"></div>`)));
              panelBody.append(
                $(`<div class="text-range" tabindex="0" data-toggle="popover" title="" data-content="" data-original-title="Mask for:"></div>`).data({ node }).append(marks)
              );
              return $(`
                <li id="wording-setting-${uuid}" class="wording-setting panel panel-default">
                  <div class="setting-header panel-heading collapsed" data-toggle="collapse" data-target="#settings-${uuid}" aria-expanded="false">
                    <span class="sortable-handler"></span>
                    <span class="show-settings tmicon tmicon-caret-right tmicon-hoverable"></span>
                    <h5 class="panel-title"><span>${node.characters}</span></h5>
                    <button name="delete-wording" data-namespace="${namespace}" data-characters="${node.characters}" type="button" class="btn btn-link btn-icon-only" title="Remove wording from namespace - ${namespace}">
                      <i class="tmicon tmicon-delete"></i>
                    </button>
                  </div>
                </li>
              `).append(settings);
            })
          )
          .sortable({
            placeholder: "ui-state-highlight",
            handle: ".sortable-handler",
            start: (e, ui) => {
              var lists = $(e.target)
                .children()
                .not(".ui-sortable-placeholder");
              sortIndex = lists.index(ui.item);
            },
            stop: (e, ui) => {
              var lists = $(e.target)
                .children()
                .not(".ui-sortable-placeholder");
              var afterIndex = lists.index(ui.item);
              if (sortIndex !== afterIndex) {
                var sortableItem = i18n[namespace].splice(sortIndex, 1);
                i18n[namespace].splice(afterIndex, 0, sortableItem[0]);
              }
            }
          })
          .parent()
          .collapse("show");
      };
      var markText = (culc, current) =>
        culc.add(
          $(
            `<span title="${current.type}${
              current.paramName ? ": " + current.paramName : ""
            }" class="${current.type}">${current.text}</span>`
          ).data('mark', current)
        );

      var markOpts = $(`<ul class="markOpts"></ul>`)
      .append(
        $(`
          <li class="wording">
            Wording
            <button type="button" class="btn btn-link btn-icon-only" value="wording">
              <i class="tmicon tmicon-flag tmicon-hoverable"></i>
            </button>
          </li>
        `) 
      )
      .append(
        $(`<li class="param">Param</li>`)
          .append(
            $(`
              <button type="button" class="btn btn-link btn-icon-only" value="param">
                <i class="tmicon tmicon-flag tmicon-hoverable"></i>
              </button>
            `)
          )
          .append(
            $(`<input name="param-name" placeholder="Optional" class="form-control input-sm">`).on('input', function (e) {
              // var input = $(this);
              // var isExist = input.data('marks').some((mark) => (mark.type === 'param' && mark.paramName === input.val()));
            })
          )
      )
      .append(`
        <li class="count">
          Count
          <button type="button" class="btn btn-link btn-icon-only" value="count">
            <i class="tmicon tmicon-flag tmicon-hoverable"></i>
          </button>
          <input name="countable-link" placeholder="Link Countable" class="form-control input-sm">
        </li>
      `)
      .append(`
        <li class="countable">
          Countable
          <button type="button" class="btn btn-link btn-icon-only" value="countable">
            <i class="tmicon tmicon-flag tmicon-hoverable"></i>
          </button>
          <input name="countable-name" placeholder="Countable Name" class="form-control input-sm">
        </li>
      `)
      .append(`
        <li class="ignore">
          Ignore
          <button type="button" class="btn btn-link btn-icon-only" value="ignore">
            <i class="tmicon tmicon-flag tmicon-hoverable"></i>
          </button>
        </li>
      `)
      .on("click", "button", e => {
        var button = $(e.target).closest("button");
        var setType = button.val();
        var { node, start, end } = markOpts.data();
        var data = node.data("node");
        var markData = {
          type: setType,
          text: data.characters.substring(start, end),
          start,
          end
        };
        var mergeMarks = (start, nextIndex) => {
          var next = data.marks[nextIndex];
          if (next && next.type === start.type) {
            start.end = next.end;
            start.text = start.text + next.text;
            mergeMarks(start, nextIndex + 1);
            data.marks[nextIndex] = null;
          }
        };

        if (setType === "param" && button.next().val()) {
          markData.paramName = button.next().val();
        }
        if (setType === "count" && button.next().val()) {
          markData.countableLink= button.next().val();
        }
        if (setType === "countable" && button.next().val()) {
          markData.countableName = button.next().val();
        }
        node.empty();

        if (!data.marks) {
          data.marks = [];
          var firstPart = data.characters.substring(0, start);
          var lastPart = data.characters.substring(end);
          firstPart &&
            data.marks.push({
              type: "wording",
              text: firstPart,
              start: 0,
              end: start
            });
          data.marks.push(markData);
          lastPart &&
            data.marks.push({
              type: "wording",
              text: lastPart,
              start: end,
              end: data.characters.length
            });
        } else {
          data.marks = flattenDeep(
            data.marks.map(mark => {
              if (mark.start >= start && mark.end <= end) {
                return null;
              }
              if (mark.start < start && mark.end > end) {
                var extraMark = {
                  type: mark.type,
                  start: end,
                  end: mark.end,
                  text: data.characters.substring(end, mark.end)
                };
                mark.end = start;
                mark.text = data.characters.substring(mark.start, mark.end);
                mark = [mark, extraMark];
                return mark;
              }
              if (mark.start >= start && mark.start < end && mark.end > end) {
                mark.start = end;
                mark.text = data.characters.substring(mark.start, mark.end);
                return mark;
              }
              if (mark.start < start && mark.end > start && mark.end <= end) {
                mark.end = start;
                mark.text = data.characters.substring(mark.start, mark.end);
                return mark;
              }
              return mark;
            })
          ).filter(mark => mark !== null);

          data.marks.push(markData);
        }
        data.marks = data.marks
          .sort((a, b) => {
            if (a.start > b.start) return 1;
            if (a.start < b.start) return -1;
            return 0;
          })
          .map((mark, index) => {
            if (mark && (mark.type === "wording" || mark.type === "ignore")) {
              mergeMarks(mark, index + 1);
            }
            return mark;
          })
          .filter(mark => mark !== null);

        var marks = data.marks.reduce(markText, $());
        node.append(marks);
        node.popover("hide");
      });
      function checkPrevTextLength(cursor) {
        var target = cursor.prev();
        if (target.length === 1) {
          return target.text().length + checkPrevTextLength(target);
        }
        return 0;
      }
      function checkBetweenTextLength(cursor, target) {
        if (cursor.is(target)) return 0;

        return (
          cursor.text().length + checkBetweenTextLength(cursor.next(), target)
        );
      }
      function checkEndTextLength(start, end, range) {
        if (start.is(end)) {
          return range.endOffset - range.startOffset;
        } else {
          var next = start.next();
          if (next.is(end)) {
            return start.text().length - range.startOffset + range.endOffset;
          } else {
            return (
              start.text().length -
              range.startOffset +
              checkBetweenTextLength(next, end) +
              range.endOffset
            );
          }
        }
      }
      var markTimer;
      $(document).on("selectionchange", e => {
        var activeTextNode = $(e.target.activeElement);
        
        if (activeTextNode.is(".text-range")) {
          var selection = document.getSelection();
          if (markTimer) {
            clearTimeout(markTimer);
          }
          markTimer = setTimeout(() => {
            var oRange = selection.getRangeAt(0);
            var oRect = oRange.getBoundingClientRect();
            var startSpan = $(oRange.startContainer).parent();
            var endSpan = $(oRange.endContainer).parent();
            if (!selection.isCollapsed) {
              var start = checkPrevTextLength(startSpan) + oRange.startOffset;
              var end = start + checkEndTextLength(startSpan, endSpan, oRange);

              activeTextNode
                .popover({
                  container: "body",
                  trigger: "manual",
                  placement: "bottom",
                  template:
                    '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
                })
                .on("show.bs.popover", () => {
                  setTimeout(() => {
                    var existingMark;
                    var paramInput = markOpts.find(`.param input`);
                    var countInput = markOpts.find(`.count input`);
                    var countableInput = markOpts.find(`.countable input`);
                    var marks = activeTextNode.data('node').marks;
                    
                    paramInput.val('');
                    countInput.val('');
                    countableInput.val('');

                    if (startSpan.is(endSpan) && oRange.startOffset === 0 && oRange.startOffset === 0 && oRange.endOffset === oRange.startContainer.length) {
                      existingMark = startSpan.data('mark');
                    }

                    
                    $(".popover .popover-content").append(
                      markOpts
                      .data({
                        node: activeTextNode,
                        start,
                        end
                      })
                      .children()
                      .removeClass('active')
                      .end()
                    );

                    if (existingMark) {
                      markOpts.find(`.${existingMark.type}`).addClass('active');
                      existingMark.paramName && paramInput.val(existingMark.paramName).data({ marks });
                      existingMark.countableLink && countInput.val(existingMark.countableLink).data({ marks });
                      existingMark.countableName && countableInput.val(existingMark.countableName).data({ marks });
                    }

                    var popover = $(".popover").removeClass(
                      "top top-left bottom bottom-left"
                    );
                    var left;
                    var top;
                    var isOutScreenWidth =
                      oRect.left + popover.width() / 2 + oRect.width / 2 + 10 >
                      $(window).width();
                    var isOutScreenHeight =
                      oRect.bottom + popover.height() + 8 > $(window).height();
  
                    if (isOutScreenWidth) {
                      if (isOutScreenHeight) {
                        top = oRect.top - popover.height();
                        popover
                          .addClass("top-left")
                          .children(".arrow")
                          .css("left", "50%");
                      } else {
                        top = oRect.top + oRect.height;
                        popover
                          .addClass("bottom-left")
                          .children(".arrow")
                          .css("left", '50%');
                      }
                      left = oRect.left + oRect.width / 2 - popover.width() + 25;
                    } else {
                      if (isOutScreenHeight) {
                        top = oRect.top - popover.addClass("top").height();
                      } else {
                        popover.addClass("bottom");
                        top = oRect.top + oRect.height;
                      }
                      left = oRect.left - popover.width() / 2 + oRect.width / 2;
                    }
                    popover.css({ top, left });
                  }, 20);
                });
              activeTextNode.popover("show");
            } else {
              var mark = startSpan.data('mark');
              oRange.setStart(oRange.startContainer, 0);
              oRange.setEnd( oRange.startContainer, mark.text.length);
              selection.removeAllRanges();
              selection.addRange(oRange);
            }
          }, 700);
        }
      });
      $(document).on("mousedown", e => {
        var target = $(e.target).closest(".popover");
        if (target.length === 0) $(".text-range").popover("hide");
      });
      namespaceContainer.on(
        "click",
        'button[name="delete-wordings"], button[name="delete-wording"], .wording-setting',
        e => {
          var target = $(e.target);
          
          if (target.is("button, i")) {
            var removeBtn = $(e.target).closest("button");
            var characters = removeBtn.data("characters");
            var namespace = removeBtn.data("namespace");
            if (removeBtn.is('[name="delete-wording"]')) {
              removeBtn.closest(".wording-setting").remove();
              i18n[namespace] = i18n[namespace].filter(
                node => {
                  return node.characters !== `${characters}`;
                }
              );
            } else if (removeBtn.is('[name="delete-wordings"]')) {
              removeBtn.closest('[role="namespace"]').find('[role="tabpanel"] ul li').remove();
              i18n[namespace] = [];
            }
            checkWordingsLength();
          }
          if (!target.is(".show-settings")) {
            e.stopPropagation();
            e.preventDefault();
          } else if (target.is(".panel-title")) {
          }
        }
      );
      var tokenlist = tokens.getTokens();
      tokenlist.reverse().forEach((namespace, index) => {
        addI18nNamespace(namespace.value, index === tokenlist.length - 1);
      });
      $(".token-input").css({
        width: "auto"
      });
      var separator = $('<div class="dropdown--separator--11K1o"></div>');
      var addToI18nItem = $(`
        <div class="multilevel_dropdown--option--1y5Jh dropdown--_optionBase--3koiI text--fontNeg12--oxUtr text--_fontBase--YWDo0 text--_whiteText--2PkdM">
            <div class="multilevel_dropdown--name--1abLT ellipsis--ellipsis--1RWY6">Add to i18n namespace:</div>
            <span class="svg-container multilevel_dropdown--rightColumn--229nN">
                <svg class="svg" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11 8L5 4v8l6-4z" fill-rule="nonzero" fill-opacity="1" fill="#000" stroke="none"></path>
                </svg>
            </span>
        </div>
      `).hover(function() {
        $(
          ".multilevel_dropdown--pointingDropdown--2WXDP .dropdown--dropdown--35dH4 .multilevel_dropdown--option--1y5Jh"
        ).css({
          background: "none"
        });
        $(
          ".multilevel_dropdown--pointingDropdown--2WXDP ~ [data-keyboard-receiver]"
        ).hide();

        namespacesMenu
          .insertAfter($(".multilevel_dropdown--pointingDropdown--2WXDP"))
          .show();

        addToI18nItem
          .css({
            background: ""
          })
          .addClass("multilevel_dropdown--optionActive--3iZDH");
      });
      $(document).on(
        "mouseenter",
        ".multilevel_dropdown--optionActive--3iZDH",
        function() {
          if (this.style.background === "none") {
            $(this).css({
              background: ""
            });
            $(
              ".js-fullscreen-prevent-event-capture .multilevel_dropdown--pointingDropdown--2WXDP ~ [data-keyboard-receiver]"
            ).show();
            addToI18nItem.removeClass(
              "multilevel_dropdown--optionActive--3iZDH"
            );
            namespacesMenu.hide();
          }
        }
      );
      $(document).on(
        "mouseenter",
        ".namespacesMenu .multilevel_dropdown--option--1y5Jh",
        function() {
          $(".namespacesMenu .multilevel_dropdown--option--1y5Jh").removeClass(
            "multilevel_dropdown--optionActive--3iZDH"
          );
          $(this).addClass("multilevel_dropdown--optionActive--3iZDH");
        }
      );
      $(document).on(
        "mousedown",
        ".namespacesMenu .multilevel_dropdown--option--1y5Jh",
        function() {
          var namespace = $(this).data("namespace");

          i18n[namespace] = i18n[namespace].concat(
            Object.values(
              textSelected.reduce((culc, node) => {
                culc[node.name] = node;
                return culc;
              }, {})
            ).filter(
              node =>
                i18n[namespace].filter(
                  existsNode => existsNode.characters === node.characters
                ).length === 0
            )
          );
          checkWordingsLength();
          updateI18nContent(namespace);
        }
      );
      var parseMarks = function (characters) {
        var matches = characters.match(/{[^\{]*}/gi);
        var splites = characters.split(/{[^\{]*}/gi);
        var cursor = 0;
        var nodes = splites.map((item, index) => {
          var marks = [];
          var match = matches? matches[index] : null;
          marks.push({
            type: "wording",
            text: item,
            start: cursor,
            end: cursor += item.length
          });
          if (match) {
            marks.push({
              type: "param",
              text: match,
              paramName: `param_${index + 1}`,
              start: cursor,
              end: cursor += match.length
            });
          }
          return marks;
        });

        return flattenDeep(nodes);
      };
      var getSelection = function(items) {
        return items.map(element => {
          if (element.type === "PAGE") {
            return getSelection(element.selection);
          }
          if (
            element.type === "FRAME" ||
            element.type === "GROUP" ||
            element.type === "INSTANCE"
          ) {
            return getSelection(element.children);
          }
          if (element.type === "TEXT") {
            var characters = element.characters.trim();
            
            if (characters) {
              return {
                name: element.name,
                characters,
                marks: parseMarks(characters)
              };
            }
          }
        });
      };
      $(document).on("contextmenu", e => {
        setTimeout(() => {
          var selectedNamespaces = tokens.getTokens();
          var contextmenu = $(
            ".multilevel_dropdown--pointingDropdown--2WXDP .dropdown--dropdown--35dH4"
          );

          textSelected = flattenDeep(getSelection(figma.root.children)).filter(
            item => item != undefined
          );
          addToI18nItem.removeClass("multilevel_dropdown--optionActive--3iZDH");
          separator.add(addToI18nItem).detach();
          

          if (textSelected.length === 0 || selectedNamespaces.length === 0) {
            separator.hide();
            addToI18nItem.hide();
            return;
          }
          contextmenu.append(separator.add(addToI18nItem));
          separator.show();
          addToI18nItem.show();

          var namespacesMenuItem = $(
            `<div class="dropdown--dropdown--35dH4 _overlayBase--_overlayBase--1sCqN multilevel_dropdown--submenu--2IXt7"></div>`
          )
            .css({
              left: contextmenu.offset().left + contextmenu.width(),
              top: addToI18nItem.prev().offset().top
            })
            .append(
              selectedNamespaces.map(item => {
                return $(`
                    <div data-namespace="${item.value}" class="multilevel_dropdown--option--1y5Jh dropdown--_optionBase--3koiI text--fontNeg12--oxUtr text--_fontBase--YWDo0 text--_whiteText--2PkdM">
                        <div class="multilevel_dropdown--name--1abLT ellipsis--ellipsis--1RWY6">${item.label}</div>
                    </div>
                `);
              })
            );
          namespacesMenu = $(
            `<div name="layerMenu" class="namespacesMenu"></div>`
          ).append($(`<div></div>`).append(namespacesMenuItem));
        }, 200);
      });
      checkWordingsLength();
    });
  }
};
var systemJSTimer = setInterval(() => {
  try {
    if (System) {
      clearInterval(systemJSTimer);

      System.config({
        map: {
          css: "http://localhost:9003/assets/system-plugin/system-plugin-css.js"
        },
        meta: {
          "*.css": { loader: "css" }
        }
      });

      System.config({
        map: {
          uuid:
            "https://cdnjs.cloudflare.com/ajax/libs/node-uuid/1.4.7/uuid.js",
          "style-portal":
            "http://localhost:9003/themes/minimalism/1.23.0/light/css/main.css",
          "jquery-2.2.4":
            "https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.4/jquery.min.js",
          bootstrap:
            "https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/js/bootstrap.min.js",
          cookie:
            "https://cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.4.1/jquery.cookie.min.js",
          "jquery-ui-token":
            "http://localhost:9003/vendors/jQuery-ui-1.12.1-token-deps/jquery-ui.min.js",
          "jquery-ui":
            "https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js",
          tokenfield:
            "https://cdnjs.cloudflare.com/ajax/libs/bootstrap-tokenfield/0.12.0/bootstrap-tokenfield.js",
          token: "http://localhost:9003/vendors/style-portal-token/token.js"
        },
        meta: {
          bootstrap: {
            format: "global",
            deps: [
              "uuid",
              "style-portal",
              "jquery-2.2.4",
              "jquery-ui",
              "cookie",
              "jquery-ui-token",
              "tokenfield",
              "token"
            ]
          }
        }
      });
    }
  } catch (e) {}
}, 200);

document.addEventListener("DOMNodeInserted", init);
