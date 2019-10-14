const pokeDex = (() => {
    const api = new apiHandler();

    const init = () => {
        console.log("start");
    }

    return {
        init
    };
})();

pokeDex.init();