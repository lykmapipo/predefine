define({ "api": [
  {
    "type": "delete",
    "url": "/predefines/:id",
    "title": "Delete Existing Predefine",
    "version": "1.0.0",
    "name": "DeletePredefine",
    "group": "Predefine",
    "description": "<p>Delete existing predefine</p>",
    "filename": "lib/predefine.http.router.js",
    "groupTitle": "",
    "sampleRequest": [
      {
        "url": "https://predefine.herokuapp.com/v1/predefines/:id"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept",
            "defaultValue": "application/json",
            "description": "<p>Accepted content type</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization token</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept-Encoding",
            "defaultValue": "gzip, deflate",
            "description": "<p>Accepted encoding type</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Accept\": \"application/json\"\n  \"Authorization\": \"Bearer ey6utFreRdy5\"\n  \"Accept-Encoding\": \"gzip, deflate\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique predefine identifier</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "namespace",
            "description": "<p>Human readable namespace of a predefined.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "key",
            "description": "<p>Human readable unique identifier of a predefine.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "value",
            "description": "<p>Human readable value of a predefine.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "abbreviation",
            "description": "<p>Human readable short form of a predefine value.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "description",
            "description": "<p>A brief summary about a predefine if available i.e additional details that clarify what a predefine is for.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": true,
            "field": "weight",
            "defaultValue": "0",
            "description": "<p>Weight of the predefine to help in ordering predefines of a given namespace.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "color",
            "description": "<p>A color in hexadecimal format used to differentiate predefined value visually from one other.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "icon",
            "description": "<p>An icon in url or base64 format used to differentiate predefines visually.</p>"
          },
          {
            "group": "Success 200",
            "type": "Geometry",
            "optional": true,
            "field": "geometry",
            "description": "<p>A geo-geometry representation of a predefined.</p>"
          },
          {
            "group": "Success 200",
            "type": "Map",
            "optional": true,
            "field": "properties",
            "description": "<p>A map of key value pairs to allow to associate other meaningful information to a predefined.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": true,
            "field": "createdAt",
            "description": "<p>Date when predefine was created</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": true,
            "field": "updatedAt",
            "description": "<p>Date when predefine was last updated</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"_id\": \"5b622350480e576243f10d8b\",\n  \"namespace\": \"Contact\",\n  \"key\": \"group\",\n  \"value\": \"family\",\n  \"updatedAt\": \"2019-03-14T21:17:04.729Z\",\n  \"createdAt\": \"2019-03-14T21:17:04.729Z\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "JWTExpired",
            "description": "<p>Authorization token has expired</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AuthorizationHeaderRequired",
            "description": "<p>Authorization header is required</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"jwt expired\",\n  \"error\":{}\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"Authorization header required\",\n  \"error\":{}\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/predefines/:id",
    "title": "Get Existing Predefine",
    "version": "1.0.0",
    "name": "GetPredefine",
    "group": "Predefine",
    "description": "<p>Get existing predefine</p>",
    "filename": "lib/predefine.http.router.js",
    "groupTitle": "",
    "sampleRequest": [
      {
        "url": "https://predefine.herokuapp.com/v1/predefines/:id"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept",
            "defaultValue": "application/json",
            "description": "<p>Accepted content type</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization token</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept-Encoding",
            "defaultValue": "gzip, deflate",
            "description": "<p>Accepted encoding type</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Accept\": \"application/json\"\n  \"Authorization\": \"Bearer ey6utFreRdy5\"\n  \"Accept-Encoding\": \"gzip, deflate\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique predefine identifier</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "namespace",
            "description": "<p>Human readable namespace of a predefined.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "key",
            "description": "<p>Human readable unique identifier of a predefine.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "value",
            "description": "<p>Human readable value of a predefine.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "abbreviation",
            "description": "<p>Human readable short form of a predefine value.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "description",
            "description": "<p>A brief summary about a predefine if available i.e additional details that clarify what a predefine is for.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": true,
            "field": "weight",
            "defaultValue": "0",
            "description": "<p>Weight of the predefine to help in ordering predefines of a given namespace.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "color",
            "description": "<p>A color in hexadecimal format used to differentiate predefined value visually from one other.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "icon",
            "description": "<p>An icon in url or base64 format used to differentiate predefines visually.</p>"
          },
          {
            "group": "Success 200",
            "type": "Geometry",
            "optional": true,
            "field": "geometry",
            "description": "<p>A geo-geometry representation of a predefined.</p>"
          },
          {
            "group": "Success 200",
            "type": "Map",
            "optional": true,
            "field": "properties",
            "description": "<p>A map of key value pairs to allow to associate other meaningful information to a predefined.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": true,
            "field": "createdAt",
            "description": "<p>Date when predefine was created</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": true,
            "field": "updatedAt",
            "description": "<p>Date when predefine was last updated</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"_id\": \"5b622350480e576243f10d8b\",\n  \"namespace\": \"Contact\",\n  \"key\": \"group\",\n  \"value\": \"family\",\n  \"updatedAt\": \"2019-03-14T21:17:04.729Z\",\n  \"createdAt\": \"2019-03-14T21:17:04.729Z\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"jwt expired\",\n  \"error\":{}\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"Authorization header required\",\n  \"error\":{}\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AuthorizationHeaderRequired",
            "description": "<p>Authorization header is required</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/predefines/schema",
    "title": "Get Predefine Schema",
    "version": "1.0.0",
    "name": "GetPredefineSchema",
    "group": "Predefine",
    "description": "<p>Returns predefine json schema definition</p>",
    "filename": "lib/predefine.http.router.js",
    "groupTitle": "",
    "sampleRequest": [
      {
        "url": "https://predefine.herokuapp.com/v1/predefines/schema"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept",
            "defaultValue": "application/json",
            "description": "<p>Accepted content type</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization token</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept-Encoding",
            "defaultValue": "gzip, deflate",
            "description": "<p>Accepted encoding type</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/predefines",
    "title": "List Predefines",
    "version": "1.0.0",
    "name": "GetPredefines",
    "group": "Predefine",
    "description": "<p>Returns a list of predefines</p>",
    "filename": "lib/predefine.http.router.js",
    "groupTitle": "",
    "sampleRequest": [
      {
        "url": "https://predefine.herokuapp.com/v1/predefines"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept",
            "defaultValue": "application/json",
            "description": "<p>Accepted content type</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization token</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept-Encoding",
            "defaultValue": "gzip, deflate",
            "description": "<p>Accepted encoding type</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Accept\": \"application/json\"\n  \"Authorization\": \"Bearer ey6utFreRdy5\"\n  \"Accept-Encoding\": \"gzip, deflate\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>List of predefines</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data._id",
            "description": "<p>Unique predefine identifier</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.namespace",
            "description": "<p>Human readable namespace of a predefined.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.key",
            "description": "<p>Human readable unique identifier of a predefine.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.value",
            "description": "<p>Human readable value of a predefine.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "data.abbreviation",
            "description": "<p>Human readable short form of a predefine value.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "data.description",
            "description": "<p>A brief summary about a predefine if available i.e additional details that clarify what a predefine is for.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": true,
            "field": "data.weight",
            "defaultValue": "0",
            "description": "<p>Weight of the predefine to help in ordering predefines of a given namespace.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "data.color",
            "description": "<p>A color in hexadecimal format used to differentiate predefined value visually from one other.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "data.icon",
            "description": "<p>An icon in url or base64 format used to differentiate predefines visually.</p>"
          },
          {
            "group": "Success 200",
            "type": "Geometry",
            "optional": true,
            "field": "data.geometry",
            "description": "<p>A geo-geometry representation of a predefined.</p>"
          },
          {
            "group": "Success 200",
            "type": "Map",
            "optional": true,
            "field": "data.properties",
            "description": "<p>A map of key value pairs to allow to associate other meaningful information to a predefined.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": true,
            "field": "data.createdAt",
            "description": "<p>Date when predefine was created</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": true,
            "field": "data.updatedAt",
            "description": "<p>Date when predefine was last updated</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "total",
            "description": "<p>Total number of predefine</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "size",
            "description": "<p>Number of predefines returned</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>Query limit used</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "skip",
            "description": "<p>Query skip/offset used</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": "<p>Page number</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "pages",
            "description": "<p>Total number of pages</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "lastModified",
            "description": "<p>Date and time at which latest predefine was last modified</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"data\": [{\n    \"_id\": \"5b622350480e576243f10d8b\",\n    \"namespace\": \"Contact\",\n    \"key\": \"group\",\n    \"value\": \"family\",\n    \"updatedAt\": \"2019-03-14T21:17:04.729Z\",\n    \"createdAt\": \"2019-03-14T21:17:04.729Z\"\n  }],\n  \"total\": 20,\n  \"size\": 10,\n  \"limit\": 10,\n  \"skip\": 0,\n  \"page\": 1,\n  \"pages\": 2,\n  \"lastModified\": \"2018-07-29T10:11:38.111Z\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "JWTExpired",
            "description": "<p>Authorization token has expired</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AuthorizationHeaderRequired",
            "description": "<p>Authorization header is required</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"jwt expired\",\n  \"error\":{}\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"Authorization header required\",\n  \"error\":{}\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "patch",
    "url": "/predefines/:id",
    "title": "Patch Existing Predefine",
    "version": "1.0.0",
    "name": "PatchPredefine",
    "group": "Predefine",
    "description": "<p>Patch existing predefine</p>",
    "filename": "lib/predefine.http.router.js",
    "groupTitle": "",
    "sampleRequest": [
      {
        "url": "https://predefine.herokuapp.com/v1/predefines/:id"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept",
            "defaultValue": "application/json",
            "description": "<p>Accepted content type</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization token</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept-Encoding",
            "defaultValue": "gzip, deflate",
            "description": "<p>Accepted encoding type</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Accept\": \"application/json\"\n  \"Authorization\": \"Bearer ey6utFreRdy5\"\n  \"Accept-Encoding\": \"gzip, deflate\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique predefine identifier</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "namespace",
            "description": "<p>Human readable namespace of a predefined.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "key",
            "description": "<p>Human readable unique identifier of a predefine.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "value",
            "description": "<p>Human readable value of a predefine.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "abbreviation",
            "description": "<p>Human readable short form of a predefine value.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "description",
            "description": "<p>A brief summary about a predefine if available i.e additional details that clarify what a predefine is for.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": true,
            "field": "weight",
            "defaultValue": "0",
            "description": "<p>Weight of the predefine to help in ordering predefines of a given namespace.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "color",
            "description": "<p>A color in hexadecimal format used to differentiate predefined value visually from one other.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "icon",
            "description": "<p>An icon in url or base64 format used to differentiate predefines visually.</p>"
          },
          {
            "group": "Success 200",
            "type": "Geometry",
            "optional": true,
            "field": "geometry",
            "description": "<p>A geo-geometry representation of a predefined.</p>"
          },
          {
            "group": "Success 200",
            "type": "Map",
            "optional": true,
            "field": "properties",
            "description": "<p>A map of key value pairs to allow to associate other meaningful information to a predefined.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": true,
            "field": "createdAt",
            "description": "<p>Date when predefine was created</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": true,
            "field": "updatedAt",
            "description": "<p>Date when predefine was last updated</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"_id\": \"5b622350480e576243f10d8b\",\n  \"namespace\": \"Contact\",\n  \"key\": \"group\",\n  \"value\": \"family\",\n  \"updatedAt\": \"2019-03-14T21:17:04.729Z\",\n  \"createdAt\": \"2019-03-14T21:17:04.729Z\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "JWTExpired",
            "description": "<p>Authorization token has expired</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AuthorizationHeaderRequired",
            "description": "<p>Authorization header is required</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"jwt expired\",\n  \"error\":{}\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"Authorization header required\",\n  \"error\":{}\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/predefines/:id",
    "title": "Put Existing Predefine",
    "version": "1.0.0",
    "name": "PutPredefine",
    "group": "Predefine",
    "description": "<p>Put existing predefine</p>",
    "filename": "lib/predefine.http.router.js",
    "groupTitle": "",
    "sampleRequest": [
      {
        "url": "https://predefine.herokuapp.com/v1/predefines/:id"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept",
            "defaultValue": "application/json",
            "description": "<p>Accepted content type</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization token</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept-Encoding",
            "defaultValue": "gzip, deflate",
            "description": "<p>Accepted encoding type</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Accept\": \"application/json\"\n  \"Authorization\": \"Bearer ey6utFreRdy5\"\n  \"Accept-Encoding\": \"gzip, deflate\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique predefine identifier</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "namespace",
            "description": "<p>Human readable namespace of a predefined.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "key",
            "description": "<p>Human readable unique identifier of a predefine.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "value",
            "description": "<p>Human readable value of a predefine.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "abbreviation",
            "description": "<p>Human readable short form of a predefine value.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "description",
            "description": "<p>A brief summary about a predefine if available i.e additional details that clarify what a predefine is for.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": true,
            "field": "weight",
            "defaultValue": "0",
            "description": "<p>Weight of the predefine to help in ordering predefines of a given namespace.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "color",
            "description": "<p>A color in hexadecimal format used to differentiate predefined value visually from one other.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "icon",
            "description": "<p>An icon in url or base64 format used to differentiate predefines visually.</p>"
          },
          {
            "group": "Success 200",
            "type": "Geometry",
            "optional": true,
            "field": "geometry",
            "description": "<p>A geo-geometry representation of a predefined.</p>"
          },
          {
            "group": "Success 200",
            "type": "Map",
            "optional": true,
            "field": "properties",
            "description": "<p>A map of key value pairs to allow to associate other meaningful information to a predefined.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": true,
            "field": "createdAt",
            "description": "<p>Date when predefine was created</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": true,
            "field": "updatedAt",
            "description": "<p>Date when predefine was last updated</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"_id\": \"5b622350480e576243f10d8b\",\n  \"namespace\": \"Contact\",\n  \"key\": \"group\",\n  \"value\": \"family\",\n  \"updatedAt\": \"2019-03-14T21:17:04.729Z\",\n  \"createdAt\": \"2019-03-14T21:17:04.729Z\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "JWTExpired",
            "description": "<p>Authorization token has expired</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AuthorizationHeaderRequired",
            "description": "<p>Authorization header is required</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"jwt expired\",\n  \"error\":{}\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"Authorization header required\",\n  \"error\":{}\n}",
          "type": "json"
        }
      ]
    }
  }
] });
