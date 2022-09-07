export type KhojContract = {
  "version": "0.1.0",
  "name": "khoj_contract",
  "instructions": [
    {
      "name": "initPlatform",
      "accounts": [
        {
          "name": "platform",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payerMintTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "ix",
          "type": {
            "defined": "InitPlatformIx"
          }
        }
      ]
    },
    {
      "name": "initEmployer",
      "accounts": [
        {
          "name": "employer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "ix",
          "type": {
            "defined": "InitEmployerIx"
          }
        }
      ]
    },
    {
      "name": "updateEmployer",
      "accounts": [
        {
          "name": "employer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "ix",
          "type": {
            "defined": "UpdateEmployerIx"
          }
        }
      ]
    },
    {
      "name": "aggregate",
      "accounts": [
        {
          "name": "aggregatorLink",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "aggregator",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "employer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "ix",
          "type": {
            "defined": "AggregateIx"
          }
        }
      ]
    },
    {
      "name": "initTalent",
      "accounts": [
        {
          "name": "talent",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "ix",
          "type": {
            "defined": "InitTalentIx"
          }
        }
      ]
    },
    {
      "name": "updateTalent",
      "accounts": [
        {
          "name": "talent",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "ix",
          "type": {
            "defined": "UpdateTalentIx"
          }
        }
      ]
    },
    {
      "name": "stake",
      "accounts": [
        {
          "name": "platform",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stake",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stakeMintTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "talent",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payerMintTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "ix",
          "type": {
            "defined": "StakeIx"
          }
        }
      ]
    },
    {
      "name": "restake",
      "accounts": [
        {
          "name": "platform",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stake",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stakeMintTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "talent",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payerMintTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "ix",
          "type": {
            "defined": "RestakeIx"
          }
        }
      ]
    },
    {
      "name": "unstake",
      "accounts": [
        {
          "name": "platform",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "talent",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stake",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payerMintTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stakeMintTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "ix",
          "type": {
            "defined": "UnstakeIx"
          }
        }
      ]
    },
    {
      "name": "initJob",
      "accounts": [
        {
          "name": "job",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "employer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "priceMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "creator",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "ix",
          "type": {
            "defined": "InitJobIx"
          }
        }
      ]
    },
    {
      "name": "closeJob",
      "accounts": [
        {
          "name": "job",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "creator",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": []
    },
    {
      "name": "initProposal",
      "accounts": [
        {
          "name": "proposal",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "job",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "talent",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "proposer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "ix",
          "type": {
            "defined": "InitProposalIx"
          }
        }
      ]
    },
    {
      "name": "acceptProposal",
      "accounts": [
        {
          "name": "escrow",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "escrowTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "proposal",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "job",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "authorityTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "ix",
          "type": {
            "defined": "AcceptProposalIx"
          }
        }
      ]
    },
    {
      "name": "submitWork",
      "accounts": [
        {
          "name": "proposal",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "job",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "proposer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "ix",
          "type": {
            "defined": "SubmitWorkIx"
          }
        }
      ]
    },
    {
      "name": "acceptWork",
      "accounts": [
        {
          "name": "escrow",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "escrowTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "proposal",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "job",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "proposerTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "ix",
          "type": {
            "defined": "AcceptWorkIx"
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "platform",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "mint",
            "type": "publicKey"
          },
          {
            "name": "mintTokenAccount",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "aggregatorLink",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "aggregator",
            "type": "publicKey"
          },
          {
            "name": "employer",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "employer",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "wallet",
            "type": "publicKey"
          },
          {
            "name": "pfp",
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "uri",
            "type": "string"
          },
          {
            "name": "stakeAmount",
            "type": "u64"
          },
          {
            "name": "createdJobCount",
            "type": "u64"
          },
          {
            "name": "discordHandle",
            "type": {
              "option": "string"
            }
          },
          {
            "name": "twitterHandle",
            "type": {
              "option": "string"
            }
          },
          {
            "name": "isAggregator",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "talent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "wallet",
            "type": "publicKey"
          },
          {
            "name": "pfp",
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "uri",
            "type": "string"
          },
          {
            "name": "stakeAmount",
            "type": "u64"
          },
          {
            "name": "submittedProposalCount",
            "type": "u64"
          },
          {
            "name": "skills",
            "type": {
              "vec": "string"
            }
          },
          {
            "name": "discordHandle",
            "type": {
              "option": "string"
            }
          },
          {
            "name": "twitterHandle",
            "type": {
              "option": "string"
            }
          }
        ]
      }
    },
    {
      "name": "job",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "creator",
            "type": "publicKey"
          },
          {
            "name": "category",
            "type": "string"
          },
          {
            "name": "jobType",
            "type": "u8"
          },
          {
            "name": "state",
            "type": "u8"
          },
          {
            "name": "title",
            "type": "string"
          },
          {
            "name": "uri",
            "type": "string"
          },
          {
            "name": "price",
            "type": "u64"
          },
          {
            "name": "priceMint",
            "type": "publicKey"
          },
          {
            "name": "proposalCount",
            "type": "u64"
          },
          {
            "name": "acceptedProposal",
            "type": "publicKey"
          },
          {
            "name": "createdAt",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "proposal",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "proposer",
            "type": "publicKey"
          },
          {
            "name": "job",
            "type": "publicKey"
          },
          {
            "name": "state",
            "type": "u8"
          },
          {
            "name": "uri",
            "type": "string"
          },
          {
            "name": "price",
            "type": "u64"
          },
          {
            "name": "createdAt",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "escrow",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "stake",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "AcceptProposalIx",
      "type": {
        "kind": "struct",
        "fields": []
      }
    },
    {
      "name": "AcceptWorkIx",
      "type": {
        "kind": "struct",
        "fields": []
      }
    },
    {
      "name": "AggregateIx",
      "type": {
        "kind": "struct",
        "fields": []
      }
    },
    {
      "name": "InitEmployerIx",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "uri",
            "type": "string"
          },
          {
            "name": "pfp",
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "discordHandle",
            "type": {
              "option": "string"
            }
          },
          {
            "name": "twitterHandle",
            "type": {
              "option": "string"
            }
          }
        ]
      }
    },
    {
      "name": "InitJobIx",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "title",
            "type": "string"
          },
          {
            "name": "uri",
            "type": "string"
          },
          {
            "name": "price",
            "type": "u64"
          },
          {
            "name": "jobType",
            "type": "u8"
          },
          {
            "name": "category",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "InitPlatformIx",
      "type": {
        "kind": "struct",
        "fields": []
      }
    },
    {
      "name": "InitProposalIx",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "uri",
            "type": "string"
          },
          {
            "name": "price",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "InitTalentIx",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "uri",
            "type": "string"
          },
          {
            "name": "pfp",
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "skills",
            "type": {
              "vec": "string"
            }
          },
          {
            "name": "discordHandle",
            "type": {
              "option": "string"
            }
          },
          {
            "name": "twitterHandle",
            "type": {
              "option": "string"
            }
          }
        ]
      }
    },
    {
      "name": "RestakeIx",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "amount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "StakeIx",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "amount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "SubmitWorkIx",
      "type": {
        "kind": "struct",
        "fields": []
      }
    },
    {
      "name": "UnstakeIx",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "amount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "UpdateEmployerIx",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "name",
            "type": {
              "option": "string"
            }
          },
          {
            "name": "pfp",
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "discordHandle",
            "type": {
              "option": "string"
            }
          },
          {
            "name": "twitterHandle",
            "type": {
              "option": "string"
            }
          }
        ]
      }
    },
    {
      "name": "UpdateTalentIx",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "name",
            "type": {
              "option": "string"
            }
          },
          {
            "name": "pfp",
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "discordHandle",
            "type": {
              "option": "string"
            }
          },
          {
            "name": "twitterHandle",
            "type": {
              "option": "string"
            }
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "Unauthorized",
      "msg": "Unauthorized"
    },
    {
      "code": 6001,
      "name": "JobNotAvailable",
      "msg": "Job Not Available"
    },
    {
      "code": 6002,
      "name": "ProposalNotForThisJob",
      "msg": "Proposal not for this job"
    },
    {
      "code": 6003,
      "name": "InvalidPriceMint",
      "msg": "Invalid Price Mint"
    },
    {
      "code": 6004,
      "name": "InvalidTokenAccount",
      "msg": "Invalid Token Account"
    },
    {
      "code": 6005,
      "name": "InvalidProposal",
      "msg": "Invalid Proposal"
    }
  ]
};

export const IDL: KhojContract = {
  "version": "0.1.0",
  "name": "khoj_contract",
  "instructions": [
    {
      "name": "initPlatform",
      "accounts": [
        {
          "name": "platform",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payerMintTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "ix",
          "type": {
            "defined": "InitPlatformIx"
          }
        }
      ]
    },
    {
      "name": "initEmployer",
      "accounts": [
        {
          "name": "employer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "ix",
          "type": {
            "defined": "InitEmployerIx"
          }
        }
      ]
    },
    {
      "name": "updateEmployer",
      "accounts": [
        {
          "name": "employer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "ix",
          "type": {
            "defined": "UpdateEmployerIx"
          }
        }
      ]
    },
    {
      "name": "aggregate",
      "accounts": [
        {
          "name": "aggregatorLink",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "aggregator",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "employer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "ix",
          "type": {
            "defined": "AggregateIx"
          }
        }
      ]
    },
    {
      "name": "initTalent",
      "accounts": [
        {
          "name": "talent",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "ix",
          "type": {
            "defined": "InitTalentIx"
          }
        }
      ]
    },
    {
      "name": "updateTalent",
      "accounts": [
        {
          "name": "talent",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "ix",
          "type": {
            "defined": "UpdateTalentIx"
          }
        }
      ]
    },
    {
      "name": "stake",
      "accounts": [
        {
          "name": "platform",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stake",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stakeMintTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "talent",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payerMintTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "ix",
          "type": {
            "defined": "StakeIx"
          }
        }
      ]
    },
    {
      "name": "restake",
      "accounts": [
        {
          "name": "platform",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stake",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stakeMintTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "talent",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payerMintTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "ix",
          "type": {
            "defined": "RestakeIx"
          }
        }
      ]
    },
    {
      "name": "unstake",
      "accounts": [
        {
          "name": "platform",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "talent",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stake",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payerMintTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stakeMintTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "ix",
          "type": {
            "defined": "UnstakeIx"
          }
        }
      ]
    },
    {
      "name": "initJob",
      "accounts": [
        {
          "name": "job",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "employer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "priceMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "creator",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "ix",
          "type": {
            "defined": "InitJobIx"
          }
        }
      ]
    },
    {
      "name": "closeJob",
      "accounts": [
        {
          "name": "job",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "creator",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": []
    },
    {
      "name": "initProposal",
      "accounts": [
        {
          "name": "proposal",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "job",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "talent",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "proposer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "ix",
          "type": {
            "defined": "InitProposalIx"
          }
        }
      ]
    },
    {
      "name": "acceptProposal",
      "accounts": [
        {
          "name": "escrow",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "escrowTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "proposal",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "job",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "authorityTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "ix",
          "type": {
            "defined": "AcceptProposalIx"
          }
        }
      ]
    },
    {
      "name": "submitWork",
      "accounts": [
        {
          "name": "proposal",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "job",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "proposer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "ix",
          "type": {
            "defined": "SubmitWorkIx"
          }
        }
      ]
    },
    {
      "name": "acceptWork",
      "accounts": [
        {
          "name": "escrow",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "escrowTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "proposal",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "job",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "proposerTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "ix",
          "type": {
            "defined": "AcceptWorkIx"
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "platform",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "mint",
            "type": "publicKey"
          },
          {
            "name": "mintTokenAccount",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "aggregatorLink",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "aggregator",
            "type": "publicKey"
          },
          {
            "name": "employer",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "employer",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "wallet",
            "type": "publicKey"
          },
          {
            "name": "pfp",
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "uri",
            "type": "string"
          },
          {
            "name": "stakeAmount",
            "type": "u64"
          },
          {
            "name": "createdJobCount",
            "type": "u64"
          },
          {
            "name": "discordHandle",
            "type": {
              "option": "string"
            }
          },
          {
            "name": "twitterHandle",
            "type": {
              "option": "string"
            }
          },
          {
            "name": "isAggregator",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "talent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "wallet",
            "type": "publicKey"
          },
          {
            "name": "pfp",
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "uri",
            "type": "string"
          },
          {
            "name": "stakeAmount",
            "type": "u64"
          },
          {
            "name": "submittedProposalCount",
            "type": "u64"
          },
          {
            "name": "skills",
            "type": {
              "vec": "string"
            }
          },
          {
            "name": "discordHandle",
            "type": {
              "option": "string"
            }
          },
          {
            "name": "twitterHandle",
            "type": {
              "option": "string"
            }
          }
        ]
      }
    },
    {
      "name": "job",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "creator",
            "type": "publicKey"
          },
          {
            "name": "category",
            "type": "string"
          },
          {
            "name": "jobType",
            "type": "u8"
          },
          {
            "name": "state",
            "type": "u8"
          },
          {
            "name": "title",
            "type": "string"
          },
          {
            "name": "uri",
            "type": "string"
          },
          {
            "name": "price",
            "type": "u64"
          },
          {
            "name": "priceMint",
            "type": "publicKey"
          },
          {
            "name": "proposalCount",
            "type": "u64"
          },
          {
            "name": "acceptedProposal",
            "type": "publicKey"
          },
          {
            "name": "createdAt",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "proposal",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "proposer",
            "type": "publicKey"
          },
          {
            "name": "job",
            "type": "publicKey"
          },
          {
            "name": "state",
            "type": "u8"
          },
          {
            "name": "uri",
            "type": "string"
          },
          {
            "name": "price",
            "type": "u64"
          },
          {
            "name": "createdAt",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "escrow",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "stake",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "AcceptProposalIx",
      "type": {
        "kind": "struct",
        "fields": []
      }
    },
    {
      "name": "AcceptWorkIx",
      "type": {
        "kind": "struct",
        "fields": []
      }
    },
    {
      "name": "AggregateIx",
      "type": {
        "kind": "struct",
        "fields": []
      }
    },
    {
      "name": "InitEmployerIx",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "uri",
            "type": "string"
          },
          {
            "name": "pfp",
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "discordHandle",
            "type": {
              "option": "string"
            }
          },
          {
            "name": "twitterHandle",
            "type": {
              "option": "string"
            }
          }
        ]
      }
    },
    {
      "name": "InitJobIx",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "title",
            "type": "string"
          },
          {
            "name": "uri",
            "type": "string"
          },
          {
            "name": "price",
            "type": "u64"
          },
          {
            "name": "jobType",
            "type": "u8"
          },
          {
            "name": "category",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "InitPlatformIx",
      "type": {
        "kind": "struct",
        "fields": []
      }
    },
    {
      "name": "InitProposalIx",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "uri",
            "type": "string"
          },
          {
            "name": "price",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "InitTalentIx",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "uri",
            "type": "string"
          },
          {
            "name": "pfp",
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "skills",
            "type": {
              "vec": "string"
            }
          },
          {
            "name": "discordHandle",
            "type": {
              "option": "string"
            }
          },
          {
            "name": "twitterHandle",
            "type": {
              "option": "string"
            }
          }
        ]
      }
    },
    {
      "name": "RestakeIx",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "amount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "StakeIx",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "amount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "SubmitWorkIx",
      "type": {
        "kind": "struct",
        "fields": []
      }
    },
    {
      "name": "UnstakeIx",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "amount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "UpdateEmployerIx",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "name",
            "type": {
              "option": "string"
            }
          },
          {
            "name": "pfp",
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "discordHandle",
            "type": {
              "option": "string"
            }
          },
          {
            "name": "twitterHandle",
            "type": {
              "option": "string"
            }
          }
        ]
      }
    },
    {
      "name": "UpdateTalentIx",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "name",
            "type": {
              "option": "string"
            }
          },
          {
            "name": "pfp",
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "discordHandle",
            "type": {
              "option": "string"
            }
          },
          {
            "name": "twitterHandle",
            "type": {
              "option": "string"
            }
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "Unauthorized",
      "msg": "Unauthorized"
    },
    {
      "code": 6001,
      "name": "JobNotAvailable",
      "msg": "Job Not Available"
    },
    {
      "code": 6002,
      "name": "ProposalNotForThisJob",
      "msg": "Proposal not for this job"
    },
    {
      "code": 6003,
      "name": "InvalidPriceMint",
      "msg": "Invalid Price Mint"
    },
    {
      "code": 6004,
      "name": "InvalidTokenAccount",
      "msg": "Invalid Token Account"
    },
    {
      "code": 6005,
      "name": "InvalidProposal",
      "msg": "Invalid Proposal"
    }
  ]
};
