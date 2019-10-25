module.exports = {
    Parse: function (input, indent) {
        var output = {
            remove: false,
            change: false,
            value: "",

            beforeSpaces: 0,
            nextSpaces: 0
        };

        var name = input.substr(7, 10).trim(); //File name
        var type = input.substr(17, 1).toUpperCase(); // I, U, O, C
        var field = input.substr(34, 1).toUpperCase(); //KEYED
        var device = input.substr(36, 7).toUpperCase().trim(); //device: DISK, WORKSTN
        var keywords = input.substr(44).trim();

        output.value = "Dcl-F " + name;

        switch (type) {
            case "I":
                type = "*Input";
                break;
            case "U":
                type = "*Update:*Delete:*Output";
                break;
            case "O":
                if (device != "PRINTER")
                    type = "*Output";
                else
                    type = "";
                break;
            case "C":
                if (device != "WORKSTN")
                    type = "*INPUT:*OUTPUT";
                else
                    type = "";
                break;

            default:
                type = "";
                break;
        }

        if (device != "DISK")
            output.value += ' ' + device;

        if (type != "")
            output.value += " Usage(" + type + ")";

        if (field == "K")
            output.value += " Keyed";

        if (keywords != "") {
            if (name == "")
                output.aboveKeywords = keywords;
            else
                output.value += " " + keywords;
        }

        if (output.value !== "") {
            output.change = true;
            output.value = output.value.trimRight() + ';';
        }
        return output;
    }
}