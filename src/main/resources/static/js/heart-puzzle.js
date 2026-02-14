var HEART_PATH = 'M80,130 C80,130 5,85 5,45 C5,20 25,2 48,2 C62,2 74,10 80,22 C86,10 98,2 112,2 C135,2 155,20 155,45 C155,85 80,130 80,130 Z';

function initHeartPuzzle(completedStages) {
    var container = document.createElement('div');
    container.className = 'heart-puzzle-container';
    container.id = 'heartPuzzleContainer';

    var filledCount = 0;
    if (completedStages.bitwisePuzzleCompleted) filledCount++;
    if (completedStages.base64PuzzleCompleted) filledCount++;
    if (completedStages.asciiPuzzleCompleted) filledCount++;
    if (completedStages.apiPuzzleCompleted) filledCount++;

    var clipRects = [
        { x: 0, y: 0, w: 80, h: 65 },
        { x: 80, y: 0, w: 80, h: 65 },
        { x: 0, y: 65, w: 80, h: 70 },
        { x: 80, y: 65, w: 80, h: 70 }
    ];

    var svgParts = '';
    svgParts += '<defs>';
    for (var i = 0; i < 4; i++) {
        var r = clipRects[i];
        svgParts += '<clipPath id="piece' + i + '"><rect x="' + r.x + '" y="' + r.y + '" width="' + r.w + '" height="' + r.h + '"/></clipPath>';
    }
    svgParts += '</defs>';

    for (var j = 0; j < 4; j++) {
        var cls = 'heart-piece-path' + (j < filledCount ? ' filled' : '');
        svgParts += '<path d="' + HEART_PATH + '" class="' + cls + '" data-piece-index="' + j + '" clip-path="url(#piece' + j + ')"/>';
    }

    svgParts += '<path d="' + HEART_PATH + '" class="heart-outline"/>';

    var svgEl = '<svg viewBox="0 0 160 135" xmlns="http://www.w3.org/2000/svg">' + svgParts + '</svg>';

    container.innerHTML =
        '<div class="heart-puzzle">' + svgEl + '</div>' +
        '<div class="puzzle-label-text">Heart Progress</div>' +
        '<div class="puzzle-progress" id="heartProgressText">' + filledCount + '/4 pieces</div>';

    document.body.appendChild(container);

    if (filledCount > 0 && filledCount < 4) {
        var lastIdx = filledCount - 1;
        setTimeout(function() {
            var lastPiece = document.querySelector('.heart-piece-path[data-piece-index="' + lastIdx + '"]');
            if (lastPiece && lastPiece.classList.contains('filled')) {
                lastPiece.classList.add('filling');
                setTimeout(function() {
                    lastPiece.classList.remove('filling');
                }, 1200);
            }
        }, 300);
    }

    if (filledCount === 4) {
        setTimeout(showHeartUnlockOverlay, 800);
    }
}

function updateHeartProgress(newFilledCount) {
    var progressText = document.getElementById('heartProgressText');

    if (newFilledCount > 0 && newFilledCount <= 4) {
        var pieceToFill = document.querySelector('.heart-piece-path[data-piece-index="' + (newFilledCount - 1) + '"]');
        if (pieceToFill && !pieceToFill.classList.contains('filled')) {
            pieceToFill.classList.add('filling');
            setTimeout(function() {
                pieceToFill.classList.remove('filling');
                pieceToFill.classList.add('filled');
            }, 1200);
        }
    }

    if (progressText) {
        progressText.textContent = newFilledCount + '/4 pieces';
    }

    if (newFilledCount === 4) {
        setTimeout(showHeartUnlockOverlay, 1500);
    }
}

function showHeartUnlockOverlay() {
    var container = document.getElementById('heartPuzzleContainer');
    if (container) container.style.display = 'none';

    var overlay = document.createElement('div');
    overlay.className = 'heart-unlock-overlay';
    overlay.id = 'heartUnlockOverlay';

    var heartSvg = '<svg viewBox="0 0 160 135" xmlns="http://www.w3.org/2000/svg"><path fill="#e91e63" stroke="none" d="' + HEART_PATH + '" style="filter: drop-shadow(0 0 20px rgba(233, 30, 99, 0.6));"/></svg>';

    overlay.innerHTML =
        '<div class="heart-unlock-content">' +
            '<div class="full-heart-animation" id="unlockHeart">' + heartSvg + '</div>' +
            '<div class="unlock-message" id="unlockMessage">You\u2019ve unlocked my heart. Now, let me show you the moments I will always remember. \u2764\uFE0F</div>' +
        '</div>';

    document.body.appendChild(overlay);
    overlay.offsetHeight;

    setTimeout(function() {
        overlay.classList.add('show');
    }, 50);

    var messageShown = false;

    overlay.addEventListener('click', function() {
        if (messageShown) {
            window.location.href = '/reward';
            return;
        }
        messageShown = true;

        var heart = document.getElementById('unlockHeart');
        if (heart) {
            heart.classList.add('heart-clicked-pulse');
        }

        setTimeout(function() {
            var message = document.getElementById('unlockMessage');
            if (message) {
                message.classList.add('visible');
            }
            setTimeout(function() {
                window.location.href = '/reward';
            }, 2500);
        }, 600);
    });
}

if (typeof questProgress !== 'undefined') {
    initHeartPuzzle(questProgress);
}
