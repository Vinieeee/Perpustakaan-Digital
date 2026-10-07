const XML_URL = "/data/books.xml";

const MODS_NS =
    "http://www.loc.gov/mods/v3";

function getElements(
    parent,
    tagName
) {
    return [
        ...parent.getElementsByTagNameNS(
            MODS_NS,
            tagName
        )
    ];
}

function getFirstElement(
    parent,
    tagName
) {
    return getElements(
        parent,
        tagName
    )[0];
}

function getText(
    parent,
    tagName
) {
    const element =
        getFirstElement(
            parent,
            tagName
        );

    return (
        element?.textContent?.trim() ||
        ""
    );
}

function getAttribute(
    parent,
    tagName,
    attribute
) {
    const element =
        getFirstElement(
            parent,
            tagName
        );

    return (
        element?.getAttribute(
            attribute
        ) || ""
    );
}

function parseAuthors(
    modsElement
) {
    const names =
        getElements(
            modsElement,
            "name"
        );

    return names
        .map((name) => {
            const nameParts =
                getElements(
                    name,
                    "namePart"
                );

            return nameParts
                .map(
                    (part) =>
                        part.textContent.trim()
                )
                .filter(Boolean)
                .join(" ");
        })
        .filter(Boolean)
        .join(", ");
}

function parseBook(
    modsElement,
    index
) {
    const title =
        getText(
            modsElement,
            "title"
        );

    const subtitle =
        getText(
            modsElement,
            "subTitle"
        );

    const publisher =
        getText(
            modsElement,
            "publisher"
        );

    const year =
        getText(
            modsElement,
            "dateIssued"
        );

    const category =
        getText(
            modsElement,
            "classification"
        );

    const identifier =
        getText(
            modsElement,
            "identifier"
        );

    const abstract =
        getText(
            modsElement,
            "abstract"
        );

    const authors =
        parseAuthors(
            modsElement
        );

    const id =
        modsElement.getAttribute("ID") ||
        identifier ||
        `xml-${index + 1}`;

    return {
        id,
        judul: title,
        subjudul: subtitle,
        penulis: authors,
        penerbit: publisher,
        tahun: year,
        kategori: category,
        identifier,
        abstrak: abstract,
        cover: "",
        stok: 5,
        lokasi: "Rak A-01"
    };
}

async function fetchBooksFromXML() {
    const response =
        await fetch(XML_URL);

    if (!response.ok) {
        throw new Error(
            `Gagal mengambil XML. Status: ${response.status}`
        );
    }

    const xmlText =
        await response.text();

    const parser =
        new DOMParser();

    const xml =
        parser.parseFromString(
            xmlText,
            "application/xml"
        );

    const parserError =
        xml.querySelector(
            "parsererror"
        );

    if (parserError) {
        throw new Error(
            "Format XML tidak valid."
        );
    }

    const records = getElements(xml, "mods");

    if (records.length === 0) {
        throw new Error(
            "Tidak ditemukan data buku pada XML."
        );
    }

    return records.map(parseBook);
}

export {
    fetchBooksFromXML
};

export default fetchBooksFromXML;