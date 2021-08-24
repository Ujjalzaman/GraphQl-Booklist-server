// import { buildSchema } from "graphql";
const { buildSchema } = require("graphql")


const schema = buildSchema(`
    type Course {
        id:ID
        courseName:String
        category:String
        price : Int
        language : String
        email: String
        stack: Stack
        teachingAssists : [TeachAssist]
    }
    type TeachAssist{
        firstName: String
        LastName : String
        experince : Int
    }

    enum Stack {
        WEB
        MOBILE
        OTHER
    }

    type Query {
        getCourse(id: ID) : Course
    }

    input CourseInput {
        id:ID
        courseName:String!
        category:String
        price : Int
        language : String
        email: String
        stack: Stack
        teachingAssists : [TeachAssist]!
    }

    input InputTeachAssist{
        firstName: String
        LastName : String
        experince : Int
    }

    type Mutation {
        createCourse(input : CourseInput) : Course
    }
`)
module.exports = schema;



const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'helloworld',
        fields: () => ({
            message: {
                type: GraphQLString,
                resolve: () => 'helow schema'
            }
        })
    })
})