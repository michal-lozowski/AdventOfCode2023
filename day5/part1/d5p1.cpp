#include <iostream>
#include <fstream>
#include <vector>
#include <string>
#include <sstream>

std::vector<long long> mapNavigator(long long startValue, long long destinationRangeStart, long long sourceRangeStart, long long rangeLength)
{
    std::vector<long long> outputVector(2);
    long long mappedValue = startValue;
    outputVector[0] = mappedValue;
    outputVector[1] = false;

    if ((startValue >= sourceRangeStart) && (startValue <= (sourceRangeStart + rangeLength - 1)))
    {
        long long rangeStartDifference = std::abs(sourceRangeStart - destinationRangeStart);
        mappedValue = (sourceRangeStart > destinationRangeStart) ? (startValue - rangeStartDifference) : (startValue + rangeStartDifference);
        outputVector[0] = mappedValue;
        outputVector[1] = true;
    }

    return outputVector;
}

int main()
{
    std::ifstream inputFile("realinput.txt");
    if (!inputFile.is_open())
    {
        std::cerr << "Error opening the file" << std::endl;
        return 1;
    }

    std::vector<std::string> inputLines;
    std::string line;
    while (std::getline(inputFile, line))
    {
        inputLines.push_back(line);
    }
    inputFile.close();

    std::istringstream iss(inputLines[0]);

    std::string ignoreString;
    iss >> ignoreString;

    long long num;
    std::vector<long long> seeds;
    while (iss >> num)
    {
        seeds.push_back(num);
    }

    std::vector<std::vector<long long>> maps;
    long counter = -1;
    bool colonEncountered = false;
    bool emptyLineEncountered = false;
    for (long i = 2; i < inputLines.size(); ++i)
    {
        if (inputLines[i].find(':') != std::string::npos)
        {
            colonEncountered = true;
            counter++;
            i++;
        }

        if (inputLines[i].empty())
        {
            emptyLineEncountered = true;
        }

        if (colonEncountered && emptyLineEncountered)
        {
            colonEncountered = false;
            emptyLineEncountered = false;
        }
        else
        {
            if (colonEncountered && !emptyLineEncountered)
            {
                std::istringstream iss(inputLines[i]);
                long long num;
                if (counter >= maps.size())
                {
                    maps.push_back(std::vector<long long>());
                }

                while (iss >> num)
                {
                    maps[counter].push_back(num);
                }
            }
        }
    }

    long long lowestLocation = -1;
    for (int i = 0; i < seeds.size(); i++)
    {
        long long xToY = seeds[i];
        std::vector<long long> mapNavigatorOutput(2);
        for (int k = 0; k < maps.size(); k++)
        {
            for (int l = 0; l < maps[k].size() / 3; l++)
            {
                mapNavigatorOutput = mapNavigator(xToY, maps[k][0 + l * 3], maps[k][1 + l * 3], maps[k][2 + l * 3]);
                xToY = mapNavigatorOutput[0];
                if (mapNavigatorOutput[1])
                    break;
            }
        }
        if (lowestLocation == -1)
            lowestLocation = xToY;
        else if (xToY < lowestLocation)
            lowestLocation = xToY;
    }

    std::cout << lowestLocation;

    return 0;
}
