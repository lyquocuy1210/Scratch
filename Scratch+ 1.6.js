// ==UserScript==
// @name         Scratch Mobile+ 1.6
// @namespace    http://tampermonkey.net/
// @version      1.6
// @description  Customation of Blockly-blocks-spite-stage-header. Auto save 5s. Horizon layout. Bigger font size(modify at the end of code). Prevent scrollup
// @match        https://scratch.mit.edu/projects/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    setTimeout(() => {
        let PreviousBlocklyWorkspaceS = "";
        let PreviousSpiteS = "none";
        let PreviousStageS = "none";
        let PreviousMenuTopbarS = "";
        const homeButton = document.querySelector('button[aria-label="Home"]');
        const tutorialsButton = document.querySelector('button[aria-label="Tutorials"]');
        const debugsButton = document.querySelector('button[aria-label="Debug"]');
        const stageAndTarget = document.querySelector('aside[aria-label="Stage and target"]');
        const toolbox = document.querySelector(".blocklyToolbox");
        const blocks = document.querySelector('.blocklyFlyout.blocklyToolboxFlyout');
        const screen = document.querySelector('.gui_body-wrapper_-6Yg4.gui_flex-wrapper_Zk207.box_box_bP3Aq');
        const blockScrollbar = document.querySelector('.blocklyScrollbarVertical.blocklyFlyoutScrollbar');
        const extension = document.querySelector(".extension-button_extension-button-container_vbAB7");
        const group = document.querySelector(".blocklyToolboxCategoryGroup");
        group.style.display = "grid";
        group.style.gridTemplateColumns = "1fr 1fr";
        group.style.gap = "2px";
        group.appendChild(extension);
        const menuTopbar = document.querySelector('.gui_menu-bar-position_pGQv1');
        const blocklyHeader = document.querySelector('.box_box_bP3Aq');
        toolbox.style.width = "120px";

        // resize event
        window.dispatchEvent(new Event("resize"));

        //Hide unneccesary button

        if (homeButton) {
            homeButton.style.display = "none";
        }

        if (tutorialsButton) {
            tutorialsButton.style.display = "none";
        }
        if (debugsButton) {
            debugsButton.style.display = "none";
        }



        // set up
        const wrapper = document.querySelector(".gui_stage-and-target-wrapper_Qg4hA");
        wrapper.style.flexDirection = "row-reverse";
        wrapper.style.display = "flex";
        wrapper.style.width = "870px";
        //stage
        const stage = document.querySelector(".stage-wrapper_stage-wrapper_odn2t");
        stage.style.position = "relative";
        stage.style.right ="-50px";
        stage.style.display="none";

        //spite
        const spite = document.querySelector('.gui_target-wrapper_gq1am.box_box_bP3Aq');
        spite.style.flexDirection = "column";
        spite.style.display="none";
        const spitePanel = spite.querySelector('.target-pane_target-pane_VWJA6');

        //Blockly workspace
        const blocklyWorkspace = document.querySelector('[aria-label="Editor"]');

        //backdrop
        const backdrop = document.querySelector(".target-pane_stage-selector-wrapper_4smlF");
        spite.appendChild(backdrop);
        backdrop.style.width = "75px";
        window.dispatchEvent(new Event("resize")); //refresh blockly



        //Show/Hide Stage button at Blockly workspace
        const MenuContainer = document.createElement("div"); //contain buttons inside menu
        const MenuBtn = document.createElement("button"); //Menu button
        const blocklyBtn = document.createElement("button");
        const stageBtn = document.createElement("button");
        const spiteBtn = document.createElement("button");
        const menuTopbarBtn = document.createElement("button");
        const BlocksBtn = document.createElement('button');
        const LockScrollingBtn = document.createElement('button');


        LockScrollingBtn.textContent = "🔴Unlock";
        LockScrollingBtn.style.position = "relative";
        LockScrollingBtn.style.zIndex = "99999";
        LockScrollingBtn.style.background = "#855cd6";
        LockScrollingBtn.style.color = "white";
        LockScrollingBtn.style.border = "none";
        LockScrollingBtn.style.borderRadius = "12px";
        LockScrollingBtn.style.padding = "8px 20px";
        LockScrollingBtn.style.fontWeight = "bold";
        LockScrollingBtn.style.fontSize = "16px";
        LockScrollingBtn.style.boxShadow = "0 2px 6px rgba(0,0,0,.25)";
        LockScrollingBtn.style.cursor = "pointer";
        LockScrollingBtn.onclick =() => {
            if (LockScrollingBtn.textContent === "🔴Unlock") {
                LockScrollingBtn.textContent = "🟢Locked";
                window.SetLockPointHere();
                window.IsLockScrollingUp = true;


            } else {
                LockScrollingBtn.textContent = "🔴Unlock";
                window.IsLockScrollingUp = false;

            }
        }

        BlocksBtn.textContent = "🟢Blocks";
        BlocksBtn.style.position = "relative";
        BlocksBtn.style.zIndex = "99999";
        BlocksBtn.style.background = "#855cd6";
        BlocksBtn.style.color = "white";
        BlocksBtn.style.border = "none";
        BlocksBtn.style.borderRadius = "12px";
        BlocksBtn.style.padding = "8px 20px";
        BlocksBtn.style.fontWeight = "bold";
        BlocksBtn.style.fontSize = "16px";
        BlocksBtn.style.boxShadow = "0 2px 6px rgba(0,0,0,.25)";
        BlocksBtn.style.cursor = "pointer";
        BlocksBtn.onclick =() => {
            if (BlocksBtn.textContent === "🟢Blocks") {
                BlocksBtn.textContent = "🔴Blocks";
                toolbox.style.display = "none";
                blocks.style.display = "none";
                blockScrollbar.style.display = "none";


            } else {
                BlocksBtn.textContent = "🟢Blocks";
                toolbox.style.display = "block";
                blocks.style.display = "block";
                blockScrollbar.style.display = "block";

            }
        }

        menuTopbarBtn.textContent = "🟢Header";
        menuTopbarBtn.style.position = "relative";
        menuTopbarBtn.style.zIndex = "99999";
        menuTopbarBtn.style.background = "#855cd6";
        menuTopbarBtn.style.color = "white";
        menuTopbarBtn.style.border = "none";
        menuTopbarBtn.style.borderRadius = "12px";
        menuTopbarBtn.style.padding = "8px 20px";
        menuTopbarBtn.style.fontWeight = "bold";
        menuTopbarBtn.style.fontSize = "16px";
        menuTopbarBtn.style.boxShadow = "0 2px 6px rgba(0,0,0,.25)";
        menuTopbarBtn.style.cursor = "pointer";
        menuTopbarBtn.style.display ="inline-block";
        menuTopbarBtn.style.alignSelf = "center";
        menuTopbarBtn.onclick =() => {
            if (menuTopbarBtn.textContent === "🟢Header") {
                menuTopbarBtn.textContent = "🔴Header";
                menuTopbar.style.display = "none";
                screen.style.height = "640px";

            } else {
                menuTopbarBtn.textContent = "🟢Header";
                menuTopbar.style.display = "";
                screen.style.height = "";
            }
            PreviousMenuTopbarS = menuTopbar.style.display;
            window.dispatchEvent(new Event("resize")); //refresh blockly
        }



        blocklyBtn.textContent = "🟢Code";
        blocklyBtn.style.position = "relative";
        blocklyBtn.style.zIndex = "99999";
        blocklyBtn.style.background = "#855cd6";
        blocklyBtn.style.color = "white";
        blocklyBtn.style.border = "none";
        blocklyBtn.style.borderRadius = "12px";
        blocklyBtn.style.padding = "8px 20px";
        blocklyBtn.style.fontWeight = "bold";
        blocklyBtn.style.fontSize = "16px";
        blocklyBtn.style.boxShadow = "0 2px 6px rgba(0,0,0,.25)";
        blocklyBtn.style.cursor = "pointer";
        blocklyBtn.style.display ="inline-block";
        blocklyBtn.style.alignSelf = "center";
        blocklyBtn.onclick =() => {

            if (blocklyBtn.textContent === "🟢Code") {
                blocklyBtn.textContent = "🔴Code";
                blocklyWorkspace.style.display = "none";



            } else {
                blocklyBtn.textContent = "🟢Code";
                blocklyWorkspace.style.display = "";

            }
            PreviousBlocklyWorkspaceS = blocklyWorkspace.style.display;
            window.dispatchEvent(new Event("resize")); //refresh blockly


        }

        spiteBtn.textContent = "🔴Spite";
        spiteBtn.style.position = "relative";
        spiteBtn.style.zIndex = "99999";
        spiteBtn.style.background = "#855cd6";
        spiteBtn.style.color = "white";
        spiteBtn.style.border = "none";
        spiteBtn.style.borderRadius = "12px";
        spiteBtn.style.padding = "8px 20px";
        spiteBtn.style.fontWeight = "bold";
        spiteBtn.style.fontSize = "16px";
        spiteBtn.style.boxShadow = "0 2px 6px rgba(0,0,0,.25)";
        spiteBtn.style.cursor = "pointer";
        spiteBtn.style.display ="inline-block";
        spiteBtn.style.alignSelf = "center";
        spiteBtn.onclick =() => {
            if (spiteBtn.textContent === "🔴Spite") {
                spiteBtn.textContent = "🟢Spite";
                spite.style.display = "flex";

            } else {
                spiteBtn.textContent = "🔴Spite";
                spite.style.display = "none";
            }
            PreviousSpiteS = spite.style.display;
            window.dispatchEvent(new Event("resize")); //refresh blockly

        }

        stageBtn.textContent = "🔴Stage";
        stageBtn.style.position = "relative";
        stageBtn.style.zIndex = "99999";
        stageBtn.style.background = "#855cd6";
        stageBtn.style.color = "white";
        stageBtn.style.border = "none";
        stageBtn.style.borderRadius = "12px";
        stageBtn.style.padding = "8px 20px";
        stageBtn.style.fontWeight = "bold";
        stageBtn.style.fontSize = "16px";
        stageBtn.style.boxShadow = "0 2px 6px rgba(0,0,0,.25)";
        stageBtn.style.cursor = "pointer";
        stageBtn.style.display ="inline-block";
        stageBtn.style.alignSelf = "center";
        stageBtn.onclick =() => {
            if (stageBtn.textContent === "🔴Stage") {
                stageBtn.textContent = "🟢Stage";
                stage.style.display = "";
            } else {
                stageBtn.textContent = "🔴Stage";
                stage.style.display = "none";
            }
            PreviousStageS = stage.style.display;
            window.dispatchEvent(new Event("resize")); //refresh blockly


        }


        MenuBtn.textContent = "☰";
        MenuBtn.style.position = "fixed";
        MenuBtn.style.zIndex = "99999";
        MenuBtn.style.background = "#3373cc";
        MenuBtn.style.color = "black";
        MenuBtn.style.border = "1px";
        MenuBtn.style.borderRadius = "12px";
        MenuBtn.style.padding = "8px 20px";
        MenuBtn.style.fontWeight = "bold";
        MenuBtn.style.fontSize = "16px";
        MenuBtn.style.boxShadow = "0 2px 6px rgba(0,0,0,.25)";
        MenuBtn.style.cursor = "pointer";

        //Set up container
        MenuContainer.style.display = "none";
        MenuContainer.style.position ="fixed";
        MenuContainer.style.flexDirection = "column";
        MenuContainer.style.gap = "15px";
        MenuContainer.className = "my-menu-container";
        MenuContainer.style.zIndex = "99999";

        // put buttons into container
        MenuContainer.appendChild(blocklyBtn); // blocklyBtn -> MenuContainer
        MenuContainer.appendChild(BlocksBtn);
        MenuContainer.appendChild(spiteBtn);
        MenuContainer.appendChild(stageBtn);
        MenuContainer.appendChild(menuTopbarBtn);
        MenuContainer.appendChild(LockScrollingBtn);
        document.body.appendChild(MenuBtn);
        document.body.appendChild(MenuContainer);


        // Make a floating MENU button

        MenuBtn.style.zIndex = "99999";
        MenuBtn.style.touchAction = "none";


        let dragging = false;
        let offsetX = 0;
        let offsetY = 0;

        MenuBtn.addEventListener("pointermove", (e) => {
            if (!dragging) return;

            const newLeft = e.clientX - offsetX;
            const newTop = e.clientY - offsetY;

            const maxLeft = window.innerWidth - MenuBtn.offsetWidth;
            const maxTop = window.innerHeight - MenuBtn.offsetHeight;

            MenuBtn.style.left = Math.max(0, Math.min(newLeft, maxLeft)) + "px";
            MenuBtn.style.top = Math.max(0, Math.min(newTop, maxTop)) + "px";

            updateMenuContainer();

        });

        MenuBtn.addEventListener("pointerup", () => {
            dragging = false;
            updateMenuContainer();
        });

        MenuBtn.addEventListener("pointercancel", () => {
            dragging = false;
        });

        let moved = false;

        MenuBtn.addEventListener("pointerdown", (e) => {

            dragging = true;

            const rect2 = MenuBtn.getBoundingClientRect();

            offsetX = e.clientX - rect2.left;
            offsetY = e.clientY - rect2.top;

            MenuBtn.setPointerCapture(e.pointerId);

            e.preventDefault();
        });

        document.addEventListener("mousemove", () => {

            if (dragging) moved = true;
        });

        MenuBtn.addEventListener("click", (e) => {
            if (moved) {
                e.preventDefault();
                e.stopPropagation();
                return;
            }

            if (MenuBtn.style.color === "black") {
                MenuBtn.style.color = "red"
                MenuContainer.style.display = "flex";

            } else {
                MenuBtn.style.color = "black"
                MenuContainer.style.display = "none";

            }
        });

        function updateMenuContainer() {
            const rect = MenuBtn.getBoundingClientRect();

            MenuContainer.style.left = (rect.right - 67) + "px";
            MenuContainer.style.top = (rect.top + 50) + "px";
        }

        //spite info 2 column

        const spiteInfo = document.querySelector('.sprite-info_sprite-info_MA8v0');
        spiteInfo.style.width = "300px";
        spiteInfo.style.flex = "0 0 400px";

        spiteInfo.style.display = "flex";
        spiteInfo.style.flexDirection = "row";
        spiteInfo.style.gap = "8px";

        const rows = document.querySelectorAll(".sprite-info_row_ZDo1L");

        rows.forEach(row => {
            row.style.display = "flex";
            row.style.flexDirection = "column";
            row.style.flex = "1";
            row.style.gap = "4px";
        });

        //Set stage size at first
        setStageSizeForEditing();


        // Open/close fullsreen mode
        let timer;
        const menu = document.querySelector(".stage-header_stage-menu-wrapper_oLSb9");

        let IsFullScreen = false;
        const mo = new MutationObserver(() => {
            clearTimeout(timer);

            timer = setTimeout(() => {
                MenuBtn.style.display=""; //Show Menu button
                setStageSizeForEditing(); //Stage size
                //Set to previous setting.
                blocklyWorkspace.style.display=PreviousBlocklyWorkspaceS;
                stage.style.display=PreviousStageS;
                spite.style.display=PreviousSpiteS;
                window.dispatchEvent(new Event("resize")); //refresh blockly

                IsFullScreen =false;
            }, 50);
        });

        // Save previous layout Setting

        menu.addEventListener("click", (e) => {

            const btn = e.target.closest("button");
            const label = btn.getAttribute("aria-label");
            if (label === "Enter full screen mode" && IsFullScreen === false) {


                mo.disconnect(); // Dừng theo dõi hoàn toàn

                MenuBtn.style.display="none"; //HIde Menu button
                MenuContainer.style.display="none"; //Hide MenuContainer
                MenuBtn.textContent = "O";
                MenuBtn.style.color = "black";


                //Set up stage for fullscreen
                const canvasSpite = document.querySelector('.stage_stage-wrapper_fu9p-.box_box_bP3Aq');
                canvasSpite.style.position =""
                canvasSpite.style.width = "";
                canvasSpite.style.height = "";
                canvasSpite.style.right = "";
                canvasSpite.style.top = "";
                const interactionStage = canvasSpite.querySelector('.stage_stage_yEvd4.box_box_bP3Aq');
                interactionStage.style.position =""
                interactionStage.style.width = "";
                interactionStage.style.height = "";
                const canvas = interactionStage.querySelector("canvas");
                canvas.style.position =""
                canvas.style.width = "";
                canvas.style.height = "";
                // Reset
                const wrapper = document.querySelector(".gui_stage-and-target-wrapper_Qg4hA");
                wrapper.style.flexDirection = "";
                wrapper.style.display = "";
                wrapper.style.width = "";
                //stage
                const stage = document.querySelector(".stage-wrapper_stage-wrapper_odn2t");
                stage.style.position = "";
                stage.style.right ="";
                stage.style.display="";

                //spite
                const spite = document.querySelector('.gui_target-wrapper_gq1am.box_box_bP3Aq');
                spite.style.display = "";
                spite.style.flexDirection = "";
                spite.style.display="";
                //backdrop
                const backdrop = document.querySelector(".target-pane_stage-selector-wrapper_4smlF");
                spitePanel.appendChild(backdrop);
                backdrop.style.width = "";

                //set Layout
                blocklyWorkspace.style.display="none";
                stage.style.display="";
                spite.style.display="none";
                window.dispatchEvent(new Event("resize")); //refresh blockly
                IsFullScreen =true;


            } else if (label===null && IsFullScreen === true) {

                // observe
                mo.observe(menu, {
                    attributes: true,
                    childList: true,
                    subtree: true
                });
            };
        });



        //Funciton setup stage size at first OR after exit fullscreen mode
        function setStageSizeForEditing() {
            // set up
            const wrapper = document.querySelector(".gui_stage-and-target-wrapper_Qg4hA");
            wrapper.style.flexDirection = "row-reverse";
            wrapper.style.display = "flex";
            wrapper.style.width = "870px";
            //stage
            const stage = document.querySelector(".stage-wrapper_stage-wrapper_odn2t");
            stage.style.position = "relative";
            stage.style.right ="-50px";
            stage.style.display="none";

            //spite
            const spite = document.querySelector('.gui_target-wrapper_gq1am.box_box_bP3Aq');
            spite.style.flexDirection = "column";
            spite.style.display="none";
            const spitePanel = spite.querySelector('.target-pane_target-pane_VWJA6');

            //Blockly workspace
            const blocklyWorkspace = document.querySelector('[aria-label="Editor"]');

            //backdrop
            const backdrop = document.querySelector(".target-pane_stage-selector-wrapper_4smlF");
            spite.appendChild(backdrop);
            backdrop.style.width = "75px";

            // setup stage stage size
            const canvasSpite = document.querySelector('.stage_stage-wrapper_fu9p-.box_box_bP3Aq');
            canvasSpite.style.position ="relative"
            canvasSpite.style.width = "532px";
            canvasSpite.style.height = "399px";
            const interactionStage = canvasSpite.querySelector('.stage_stage_yEvd4.box_box_bP3Aq');
            interactionStage.style.position ="relative"
            interactionStage.style.width = "532px";
            interactionStage.style.height = "399px";
            const canvas = interactionStage.querySelector("canvas");
            canvas.style.position ="relative"
            canvas.style.width = "532px";
            canvas.style.height = "399px";
            window.dispatchEvent(new Event("resize")); //refresh blockly
        };

        // always hide toggle(big/small stage))
        const observerToggle = new MutationObserver(() => {
            const toggle = document.querySelector(".toggle-buttons_row_0JfEg");
            if (toggle) {
                toggle.style.display = "none"
                ;
            }
        });

        observerToggle.observe(document.body, {
            childList: true,
            subtree: true
        });
        // Autosave every 5s
        let waiting = false;
        setInterval(() => {
            const saveBtn = document.querySelector(".save-status_save-now_c2ybV");

            if (saveBtn && !waiting) {
                waiting = true;

                setTimeout(() => {
                    const saveBtn = document.querySelector(".save-status_save-now_c2ybV");

                    if (saveBtn) {
                        saveBtn.click();
                    }

                    waiting = false;
                }, 5000);
            }
        }, 1000);

    }, 2000);

    ////// Preventing scrolling up
    window.IsLockScrollingUp = false; // flase=scroll. true=prevent


    // 1. Khai báo biến lưu Tọa độ Mốc Khóa và Trạng thái Khóa
    window.LockPointY = 0;
    let _isLock = false;

    // 2. HÀM LẤY ĐIỂM KHÓA TẠI VỊ TRÍ HIỆN TẠI (Gọi hàm này bất cứ lúc nào)
    window.SetLockPointHere = function() {
        window.LockPointY = window.scrollY + 10 || document.documentElement.scrollTop + 10;
    };

    // 3. Biến Bật/Tắt Khóa
    Object.defineProperty(window, 'IsLockScrollingUp', {
        get() { return _isLock; },
        set(val) {
            _isLock = val;
            if (val) {window.SetLockPointHere();}
        },
        configurable: true
    });

    // -------------------------------------------------------------
    // 4. XỬ LÝ KHÓA MÀN HÌNH (Không cho cuộn nhỏ hơn LockPointY)
    // -------------------------------------------------------------
    window.addEventListener('scroll', () => {
        if (!window.IsLockScrollingUp) return;

        const currentY = window.scrollY || document.documentElement.scrollTop;

        // Nếu cố cuộn lên cao hơn điểm khóa (currentY nhỏ hơn LockPointY)
        if (currentY < window.LockPointY) {
            window.scrollTo(window.scrollX, window.LockPointY); // Ép về lại mốc khóa
        }
    }, { passive: true });

    // Chặn vuốt mượt trên điện thoại
    let lastTouchY = 0;
    window.addEventListener('touchstart', (e) => {
        if (e.touches.length > 0) lastTouchY = e.touches[0].clientY;
    }, { passive: false });

    window.addEventListener('touchmove', (e) => {
        if (!window.IsLockScrollingUp) return;

        const currentY = window.scrollY || document.documentElement.scrollTop;

        // Khi đang đứng đúng ở mốc khóa mà cố vuốt xuống (để kéo trang lên) -> CHẶN
        if (currentY <= window.LockPointY) {
            if (e.touches.length > 0) {
                const currentTouchY = e.touches[0].clientY;
                if (currentTouchY > lastTouchY) {
                    e.preventDefault();
                }
            }
        }
        if (e.touches.length > 0) lastTouchY = e.touches[0].clientY;
    }, { passive: false });

    //////////////////Font size
    if (document.getElementById("prevent-input-zoom")) return;

    const style = document.createElement("style");
    style.id = "prevent-input-zoom";

    style.textContent = `
        input,
        textarea,
        select{
            font-size:16px!important;
            touch-action:manipulation;
        }
    `;

    document.documentElement.appendChild(style);
    //font size
})();
