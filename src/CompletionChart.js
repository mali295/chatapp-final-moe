import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PieChart, {
    Legend,
    Export,
    Series,
    Label,
    Font,
    Connector,
    Size,
    Tooltip as PieTooltip
  } from 'devextreme-react/pie-chart';
  import { Typography } from '@mui/material';
  import { getProgramInfo, getCourses } from './AdrianBackendFunctions';

  class CompletionChart extends Component {

    constructor (props) {
        super(props)
        this.state = {
            courseD: 0,
            programD: 0,
            pieData: [],
            piePercentage: 0,
        }
    }
    
    componentDidMount = async () => {
        let programInfo = await getProgramInfo(['Software Engineering', 'Musical Studies'])
        let courses = await getCourses(['2510445588'])

        this.calculatePieData(programInfo, courses)
    }

  customizeTooltip = (arg) => {
    return {
      text: `${arg.originalArgument}: ${arg.valueText}`
    }
  }

   calculatePieData = (programInfo, courseInfo) => {
        let totalCredits = 0;
        let totalModuleCredits = 0;
        let totalElectiveCredits = 0;
        let completedElectiveCredits = 0;
        let completedModuleCredits = 0;

        for (let i=0; i < programInfo.length; i++) {
          totalCredits = totalCredits + programInfo[i].totalCredits
          totalModuleCredits = totalModuleCredits + programInfo[i].totalModuleCredits
          totalElectiveCredits = totalElectiveCredits + programInfo[i].totalElectiveCredits

          
          for (let y=0; y<courseInfo.length; y++) {
            //FOR MODULE CREDITS
            for (let x=0; x < programInfo[i].required.length; x++) {
              if (courseInfo[y].courseName == programInfo[i].required[x].courseName) {
                completedModuleCredits = completedModuleCredits + programInfo[i].required[x].credits
              }
            }

            //FOR ELECTIVES --- NEEDS TO BE UPDATED WHEN PROPER ELECTIVE BACKEND FORMAT ADDED 
            for (let z=0; z < programInfo[i].recommended.length; z++) {
              if (courseInfo[y].courseName == programInfo[i].recommended[z].courseName) {
                completedElectiveCredits = completedElectiveCredits + programInfo[i].recommended[z].credits
              }
            }
          }
        }
        
        const data = [
          {
            title: 'Completed Courses',
            completion: (completedModuleCredits + completedElectiveCredits)
          },
          {
            title: 'Remaining Electives',
            completion: (totalElectiveCredits - completedElectiveCredits)
          },
          {
            title: 'Remaining Module Courses',
            completion: (totalModuleCredits - completedModuleCredits)
          }
        ]
        this.setState({piePercentage: ((((completedElectiveCredits + completedModuleCredits) / totalCredits)*100).toFixed(0))})
        this.setState({pieData: data})
      }


        render() {
            return (
                <div>
                <PieChart id="pie"
                        palette="Bright"
                        dataSource={this.state.pieData}
                        type="doughnut"
                        >
                        <Size width={300} height={300}/>
                        <Legend
                            orientation="vertical"
                            itemTextPosition="right"
                            horizontalAlignment="center"
                            verticalAlignment="bottom" />
                        <Series argumentField="title" valueField="completion">
                        </Series>
                        <PieTooltip enabled={true} customizeTooltip={this.customizeTooltip}/>
                        
                        </PieChart>
                        <Typography variant='h4' style={{position: 'relative', top: '-210px', color: '#66C23C'}}>{this.state.piePercentage}%</Typography>
                        </div>
            )
        }
    }

    export default CompletionChart