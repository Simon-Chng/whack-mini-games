window.addEventListener("DOMContentLoaded", () => {
    const gameSelect =
        document.getElementById("gameSelect");

    const reloadButton =
        document.getElementById("reloadButton");

    const gameContainer =
        document.getElementById("gameContainer");

    const ruffle = window.RufflePlayer.newest();

    let player = null;
    let loadNumber = 0;

    function waitForBrowserPaint() {
        return new Promise((resolve) => {
            requestAnimationFrame(() => {
                requestAnimationFrame(resolve);
            });
        });
    }

    async function loadGame() {
        const currentLoadNumber = ++loadNumber;

        const selectedOption =
            gameSelect.options[gameSelect.selectedIndex];

        const gameUrl = selectedOption.value;
        const gameName = selectedOption.text.trim();

        gameSelect.disabled = true;
        reloadButton.disabled = true;
        reloadButton.textContent = "Loading...";

        reloadButton.setAttribute(
            "aria-label",
            "Loading " + gameName
        );

        await waitForBrowserPaint();

        if (currentLoadNumber !== loadNumber) {
            return;
        }

        if (player !== null) {
            try {
                player.remove();
            } catch (error) {
                console.warn(
                    "Could not remove the previous player:",
                    error
                );
            }

            player = null;
        }

        gameContainer.replaceChildren();

        const newPlayer = ruffle.createPlayer();
        newPlayer.id = "rufflePlayer";

        gameContainer.appendChild(newPlayer);
        player = newPlayer;

        try {
            const playerApi = newPlayer.ruffle();

            await playerApi.load({
                url: gameUrl,
                autoplay: "on",
                unmuteOverlay: "hidden",
                backgroundColor: "#000000"
            });

            if (currentLoadNumber !== loadNumber) {
                return;
            }

            reloadButton.textContent = "Reload";

            reloadButton.setAttribute(
                "aria-label",
                "Reload " + gameName
            );
        } catch (error) {
            if (currentLoadNumber !== loadNumber) {
                return;
            }

            console.error(
                "Failed to load the game:",
                error
            );

            reloadButton.textContent = "Retry";

            reloadButton.setAttribute(
                "aria-label",
                "Retry loading " + gameName
            );

            gameContainer.innerHTML = `
                <div id="errorMessage">
                    Unable to load the selected SWF file.<br>
                    Check the filename and browser console.
                </div>
            `;

            player = null;
        } finally {
            if (currentLoadNumber === loadNumber) {
                gameSelect.disabled = false;
                reloadButton.disabled = false;
            }
        }
    }

    gameSelect.addEventListener(
        "change",
        loadGame
    );

    reloadButton.addEventListener(
        "click",
        loadGame
    );

    loadGame();
});
