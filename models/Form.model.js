const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const formSchema = new Schema(
    {
      userId: { type: mongoose.Types.ObjectId, ref: 'User' },
      d1: { type: String, required: true  },
      d2: { type: String, required: true  },
      d3: { type: String, required: true  },
      d4: { type: String, required: true  },
      d5: { type: String, required: true  },
      d6: { type: String, required: true  },
      d7: { type: Date, required: true  },
      d8: {
        type: String,
        required: true,
        enum: ['soltero/a', 'casado/a', 'en pareja', 'divorciado/a', 'otro']
        },
      d9: { type: String, required: true  },
      d10: { type: String, required: true  },
      d11: { type: String, required: true  },

      h1: {
        type: String,
        required: true,
        enum: ['casa', 'piso']
      },
      h2: { type: Boolean },
      h3: {
        type: String,
        required: true,
        enum: ['propia', 'alquilada']
      },
      h4: { type: Boolean },
      h5: { type: Boolean, required: true  },
      h6: { type: Boolean, required: true  },
      h7: { type: Boolean, required: true  },
      h8: { type: String },

      f1: { type: Number, required: true  },
      f2: { type: Boolean, required: true  },
      f3: { type: Boolean, required: true  },
      f4: { type: Boolean, required: true  },
      f5: { type: Boolean, required: true  },

      o1: { type: Boolean, required: true  },
      o2: { type: String, required: true  },
      o3: { type: String, required: true  },
      o4: { type: String, required: true  },

      g1: { type: Number, required: true  },
      g2: { type: String, required: true  },
      g3: { type: String, required: true  },
      g4: { type: String, required: true  },

      a1: { type: String, required: true  },
      a2: { type: String, required: true  },
      a3: { type: Boolean, required: true  },
      a4: { type: Boolean, required: true  },
      a5: {
        type: String,
        required: true,
        enum: ['si', 'no', 'no se']
      },

      p1: { type: String, required: true  },
      p2: { type: String, required: true  },

      m1: { type: String },
    },
    { timestamps: true }
  );
  
  const Form = mongoose.model("Form", formSchema);
  
  module.exports = Form;